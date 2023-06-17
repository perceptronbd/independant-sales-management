import { User } from "../model/user.js";
import { Product } from "../model/product.js";
import { COP } from "../model/COP.js";
import { Purchase } from "../model/purchase.js";

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
