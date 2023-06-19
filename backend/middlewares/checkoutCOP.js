import { User } from "../model/user.js";
import { CheckoutCOP } from "../model/checkoutCOP.js";
import { COP } from "../model/COP.js";

export const checkoutCOP = async (req, res, next) => {
  try {
    const { userId, reqCheckoutCOP } = req.body;

    // Find the user by userId
    const user = await User.findById(userId).populate(
      "earnedCOPs checkoutCOPs"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Calculate the total earnedCOPs of the user
    let totalEarnedCOPs = 0;
    for (const earnedCOP of user.earnedCOPs) {
      totalEarnedCOPs += earnedCOP.earnedPoints;
    }

    // Calculate total checkoutCOPs
    let totalCheckoutCOPs = 0;
    for (const checkoutCOP of user.checkoutCOPs) {
      totalCheckoutCOPs += checkoutCOP.withdrawnCOPs;
    }

    console.log("Total Earned COPs:", totalEarnedCOPs);
    console.log("Total Checkout COPs:", totalCheckoutCOPs);

    // Calculate the remaining COPs after deducting checkoutCOPs
    const remainingCOPs = totalEarnedCOPs - totalCheckoutCOPs;

    console.log("Remaining COPs:", remainingCOPs);

    console.log("Requested COPs:", reqCheckoutCOP);

    // Check if the checkoutCOP is greater than the remainingCOPs or greater than or equal to 500
    if (reqCheckoutCOP < 500) {
      return res.status(400).json({ error: "The amount is lower than 500" });
    }
    if (reqCheckoutCOP > remainingCOPs) {
      return res.status(400).json({ error: "Your balance is low" });
    }
    next();
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ error: "Failed to process checkout" });
  }
};
