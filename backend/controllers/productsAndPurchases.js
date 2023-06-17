import { User } from "../model/user.js";
import { Product } from "../model/product.js";
import { Purchase } from "../model/purchase.js";
import { createAndSaveCOP } from "../helpers/createSaveCOP.js";

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
      return res.status(400).json({ error: "Invalid request data" });
    }

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

      const userLinkUp = await User.findOne({ refCode: user.referralID });
      const userLinkUpTo = await User.findOne({
        refCode: userLinkUp?.referralID,
      });

      console.log("user role:", user.role);

      if (
        user.role === "prescriptor" &&
        (userLinkUp?.role === "generator" ||
          userLinkUp?.role === "generator-leader")
      ) {
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
        await createAndSaveCOP(
          user.referralID,
          5 * products.length,
          userLinkUp._id
        );
      }

      if (userRole === "user" && user.role === "prescriptor") {
        await createAndSaveCOP(referralID, 25 * products.length, user._id);
      } else if (
        userRole === "co-user" &&
        (user.role === "generator" || user.role === "generator-leader")
      ) {
        await createAndSaveCOP(referralID, 5 * products.length, user._id);
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
