import moment from "moment";
import { User } from "../model/user.js";
import { Product } from "../model/product.js";
import { Purchase } from "../model/purchase.js";
import { createAndSaveCOP } from "../helpers/createSaveCOP.js";

export const createProduct = async (req, res) => {
  try {
    const { name, category, price } = req.body;

    const product = new Product({
      name,
      category,
      price,
    });

    await product.save();

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("getAllProducts: ", error);
    res.state(500).json({ error: "Internal server error" });
  }
};

export const createPurchase = async (req, res) => {
  try {
    const { userId, products, referralID, userRole } = req.body;

    console.log("createPurchase:", req.body);

    // Validate input data
    if (
      !userId ||
      !products ||
      !Array.isArray(products) ||
      products.length === 0 ||
      !referralID ||
      !userRole
    ) {
      console.log("Invalid request data");
      return res.status(400).json({ error: "Invalid request data" });
    }

    const formattedProducts = products.map((productId) => ({
      productId,
      quantity: 1,
    }));

    console.log("Formatted products:", formattedProducts);

    const purchase = new Purchase({
      userId,
      products: formattedProducts,
    });

    console.log("Purchase object:", purchase);

    const savedPurchase = await purchase.save();

    console.log("Purchase saved to the database");

    await User.findByIdAndUpdate(userId, {
      $push: { purchases: savedPurchase._id },
    });

    console.log("User's purchases array updated");

    if (referralID) {
      const user = await User.findOne({ refCode: referralID });

      console.log("Referral user:", user);

      const userLinkUp = await User.findOne({ refCode: user.referralID });
      const userLinkUpTo = await User.findOne({
        refCode: userLinkUp?.referralID,
      });

      console.log("User role:", user.role);
      console.log("User link up:", userLinkUp);
      console.log("User link up to:", userLinkUpTo);

      if (
        user.role === "prescriptor" &&
        (userLinkUp?.role === "generator" ||
          userLinkUp?.role === "generator-leader")
      ) {
        console.log("Creating COP with 10 * products.length");
        await createAndSaveCOP(
          user.referralID,
          10 * products.length,
          userLinkUp._id
        );
      }

      if (
        user.role === "prescriptor" &&
        userLinkUp?.role === "generator" &&
        userLinkUpTo?.role === "generator-leader"
      ) {
        console.log("Creating COP with 5 * products.length");
        await createAndSaveCOP(
          user.referralID,
          5 * products.length,
          userLinkUp._id
        );
      }

      if (userRole === "user" && user.role === "prescriptor") {
        console.log("Creating COP with 25 * products.length");
        await createAndSaveCOP(referralID, 25 * products.length, user._id);
      } else if (
        userRole === "co-user" &&
        (user.role === "generator" || user.role === "generator-leader")
      ) {
        console.log("Creating COP with 5 * products.length");
        await createAndSaveCOP(referralID, 5 * products.length, user._id);
      } else {
        console.log(
          `Mismatched roles: user.role: ${user.role}, userRole: ${userRole}`
        );
        return res.status(400).json({
          message: `user.role: ${user.role}, userRole: ${userRole}`,
        });
      }
    }

    console.log("Purchase operation completed successfully");
    res.status(201).json(savedPurchase);
  } catch (error) {
    console.error("Error storing purchase:", error);
    res.status(500).json({ error: "Failed to store purchase" });
  }
};

export const getOrderHistory = async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate("userId", "firstName email")
      .populate("products.productId", "name price");

    if (purchases.length === 0) {
      return res.json("No purchase record");
    }

    const report = purchases.map((purchase) => {
      const { userId, products } = purchase;

      const totalProductsBought = products.reduce((total, product) => {
        return total + product.quantity;
      }, 0);

      const totalAmountMade = products.reduce((total, product) => {
        const productPrice = product.productId.price;
        return total + product.quantity * productPrice;
      }, 0);

      return {
        firstName: userId.firstName,
        email: userId.email,
        totalProductsBought,
        totalAmountMade,
      };
    });

    console.log("History Report:", report);

    res.json(report);
  } catch (error) {
    console.error("Error generating history report:", error);
    res.status(500).json({ error: "Failed to generate history report" });
  }
};

export const getLastPurchase = async (req, res) => {
  const { userIds } = req.body;
  try {
    const lastPurchases = [];

    for (const userId of userIds) {
      const purchase = await Purchase.findOne({ userId })
        .sort({ purchaseDate: -1 })
        .exec();

      const lastPurchase = {
        userId,
        lastPurchaseDate: purchase ? purchase.purchaseDate : null,
      };

      lastPurchases.push(lastPurchase);
    }

    res.status(200).json(lastPurchases);
  } catch (error) {
    console.error("Error getting users last purchases:", error);
    res.status(500).json({ error: "Failed to get users last purchases" });
  }
};

export const getTotalPurchasesToday = async (req, res) => {
  try {
    const today = moment().startOf("day");
    const purchases = await Purchase.aggregate([
      {
        $match: {
          purchaseDate: { $gte: today.toDate() },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
        },
      },
    ]);

    const totalPurchases = purchases.length > 0 ? purchases[0].total : 0;

    res.json({ totalPurchases });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve total purchases" });
  }
};

export async function getRecentPurchases(req, res) {
  try {
    // Fetch the recent 10 purchases with their user and product details
    const recentPurchases = await Purchase.find()
      .sort({ purchaseDate: -1 }) // Sort in descending order by purchaseDate
      .limit(10)
      .populate({
        path: "userId",
        select: "firstName lastName email", // Select the required user fields
      })
      .populate({
        path: "products.productId",
        select: "name price", // Select the required product fields
      });

    // Calculate the total purchase amount for each purchase
    const purchasesWithTotalAmount = recentPurchases.map((purchase) => {
      const totalAmount = purchase.products.reduce(
        (acc, product) => acc + product.quantity * product.productId.price,
        0
      );
      return {
        _id: purchase._id,
        user: {
          username: `${purchase.userId.firstName} ${purchase.userId.lastName}`,
          email: purchase.userId.email,
        },
        totalAmount,
      };
    });

    res.json(purchasesWithTotalAmount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getWeeklySum = async (req, res) => {
  try {
    // Get the current date
    const currentDate = moment();

    // Calculate the start date of the seven-day period
    const startDate = currentDate.clone().subtract(6, "days").startOf("day");

    // Create an array of all dates within the seven-day period
    const allDates = [];
    let date = startDate.clone();
    while (date.isSameOrBefore(currentDate, "day")) {
      allDates.push(date.format("YY-MM-DD"));
      date.add(1, "day");
    }

    // Find purchases within the seven-day period
    const purchases = await Purchase.find({
      purchaseDate: { $gte: startDate.toDate(), $lte: currentDate.toDate() },
    }).populate("products.productId");

    // Calculate the sum of purchases for each day
    const dailySums = purchases.reduce((result, purchase) => {
      const purchaseDate = moment(purchase.purchaseDate).format("YY-MM-DD");
      const totalQuantity = purchase.products.reduce((sum, product) => {
        return sum + product.quantity;
      }, 0);
      result[purchaseDate] = (result[purchaseDate] || 0) + totalQuantity;
      return result;
    }, {});

    // Calculate the expected total sum for the seven-day period
    const expectedTotalSum = 10 * allDates.length; // 100 sales per day for all dates

    // Calculate the percentage for each day and format the result
    const dailyPercentages = allDates.map((date) => ({
      percentage: dailySums[date]
        ? Math.ceil((dailySums[date] / expectedTotalSum) * 100)
        : 0,
      date,
    }));

    res.json(dailyPercentages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
