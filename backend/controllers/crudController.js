import { COP } from "../model/COP.js";
import { Product } from "../model/product.js";
import { Purchase } from "../model/purchase.js";
import { User } from "../model/user.js";

export const createUser = async (req, res) => {
  try {
    const {
      address,
      city,
      email,
      firstName,
      lastName,
      password,
      postalCode,
      referralID,
      role,
      state,
    } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists!" });
    } else if (role === "Select Role") {
      return res.status(409).json({ error: "Please select a user role!" });
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      role,
      address,
      city,
      state,
      postalCode,
      referralID,
    });
    const savedUser = await newUser.save();
    res.status(201).json(`created user succesffully: ${savedUser}`);
  } catch (error) {
    console.log("error in createUser controller", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("req.user: ", req.user);
    console.log("userId: ", userId);
    if (req.user.role === "manager") {
      const result = await User.deleteOne({ _id: userId });
      if (result.deletedCount === 1) {
        return res.status(200).json("User has been deleted!");
      } else {
        return res.status(404).json("User not found.");
      }
    } else {
      res.status(403).json("Unauthorized request!");
    }
  } catch (error) {
    console.error("Error in deleteUser controller: ", error);
  }
};

export const getUserForManager = async (req, res) => {
  try {
  } catch (error) {
    console.error("getUserForManger:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUsersWithPurchaseInfo = async (req, res) => {
  const { refCode } = req.params;

  try {
    const users = await User.find(
      { referralID: refCode },
      { _id: 1, firstName: 1, email: 1, email: 1, role: 1, referralID: 1 }
    )
      .populate({
        path: "purchases",
        populate: {
          path: "products.productId",
          model: "Product",
        },
      })
      .exec();

    const usersWithPurchaseInfo = users.map((user) => {
      const { purchases } = user;
      let lastPurchaseDate = null;
      let totalAmountSpent = 0;

      if (purchases.length > 0) {
        // Find the last purchase date
        const purchaseDates = purchases.map(
          (purchase) => purchase.purchaseDate
        );
        const maxDate = new Date(Math.max(...purchaseDates));
        lastPurchaseDate = maxDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        // Calculate total amount spent
        totalAmountSpent = purchases.reduce((total, purchase) => {
          const products = purchase.products;
          const purchaseAmount = products.reduce((amount, product) => {
            return amount + product.quantity * product.productId.price;
          }, 0);
          return total + purchaseAmount;
        }, 0);
      }

      return {
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
        role: user.role,
        referralID: user.referralID,
        lastPurchaseDate,
        totalAmountSpent,
      };
    });

    usersWithPurchaseInfo.sort((a, b) => a.email.localeCompare(b.email));

    res.json(usersWithPurchaseInfo);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal server error" });
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

    const formattedProducts = products.map((productId) => ({
      productId,
      quantity: 1,
    }));

    const purchase = new Purchase({
      userId,
      products: formattedProducts,
    });

    const savedPurchase = await purchase.save();

    await User.findByIdAndUpdate(userId, {
      $push: { purchases: savedPurchase._id },
    });

    if (referralID) {
      const user = await User.findOne({ refCode: referralID });
      if (userRole === "user" && user.role === "prescriptor") {
        const cop = new COP({
          refCode: referralID,
          earnedPoints: 25 * products.length,
          user: user._id,
        });
        await cop.save();
        await User.findByIdAndUpdate(user._id, {
          $push: { earnedCOPs: cop._id },
        });
      } else if (
        userRole === "co-user" &&
        (user.role === "generator" || user.role === "generator-leader")
      ) {
        const cop = new COP({
          refCode: referralID,
          earnedPoints: 5 * products.length,
          user: user._id,
        });
        await cop.save();
        await User.findByIdAndUpdate(user._id, {
          $push: { earnedCOPs: cop._id },
        });
      } else {
        return res.status(400).json({
          message: `user.role: ${user.role}, userRole: ${userRole}`,
        });
      }
    }

    res.status(201).json(savedPurchase);
  } catch (error) {
    console.error("Error storing purchase:", error);
    res.status(500).json({ error: "Failed to store purchase" });
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
