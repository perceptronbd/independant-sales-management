import { CheckoutRequest } from "../model/checkoutReq.js";
import { CheckoutCOP } from "../model/checkoutCOP.js";
import { User } from "../model/user.js";
import { subMonths } from "date-fns";

export const getAllEarnedCOPs = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("getAllEarnedCOPs:", userId);

    const user = await User.findById(userId).populate("earnedCOPs");
    console.log("User:", user);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    const earnedCOPs = user.earnedCOPs;
    console.log("Earned COPs:", earnedCOPs);

    let totalEarnedPoints = 0;

    earnedCOPs.forEach((cop) => {
      totalEarnedPoints += cop.earnedPoints;
    });

    console.log("Total Earned Points:", totalEarnedPoints);

    res.status(200).json(totalEarnedPoints);
  } catch (error) {
    console.error("Error retrieving earnedCOPs:", error);
    res.status(500).json({ error: "Failed to retrieve earnedCOPs" });
  }
};
export const getAvailableCOPs = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("getAllEarnedCOPs:", userId);

    const user = await User.findById(userId).populate(
      "earnedCOPs checkoutCOPs"
    );
    console.log("User:", user);

    if (!user) {
      console.log("User not found");
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

    res.status(200).json(remainingCOPs);
  } catch (error) {
    console.error("Error retrieving earnedCOPs:", error);
    res.status(500).json({ error: "Failed to retrieve earnedCOPs" });
  }
};

export const createCheckoutRequest = async (req, res) => {
  try {
    const { userId, reqCheckoutCOP, comment } = req.body;

    // Validate input data
    if (!userId || !reqCheckoutCOP) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    // Check if the user has made a request within the last month
    const lastMonth = subMonths(new Date(), 1);
    const existingRequest = await CheckoutRequest.findOne({
      user: userId,
      createdAt: { $gte: lastMonth },
    });
    console.log("existingRequest: ", existingRequest);

    if (existingRequest || existingRequest === null) {
      return res.status(403).json({
        error: "You have made a request within the last month",
      });
    }

    // Create a new checkout request
    const checkoutRequest = new CheckoutRequest({
      checkoutCOP: reqCheckoutCOP,
      comment,
      user: userId,
    });

    await checkoutRequest.save();

    res.status(200).json({ message: "Checkout request has been made" });
  } catch (error) {
    console.error("Error creating checkout request:", error);
    res.status(500).json({ error: "Failed to create checkout request" });
  }
};

export const getCheckoutReq = async (req, res) => {
  try {
    // Retrieve checkout requests and populate user information
    const requests = await CheckoutRequest.find({
      checked: { $in: [false, null] },
    })
      .populate("user", "firstName lastName role")
      .exec();

    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateCheckout = async (req, res) => {
  const { userId } = req.body;

  try {
    console.log("Updating checkout request...");
    // Find the checkout request by userId and update the checked value
    const checkoutRequest = await CheckoutRequest.findOneAndUpdate(
      { user: userId },
      { checked: true },
      { new: true }
    );

    console.log("Updated checkoutRequest:", checkoutRequest);

    if (!checkoutRequest) {
      console.log("Checkout request not found");
      return res.status(404).json({ message: "Checkout request not found" });
    }

    console.log("Creating checkout COP...");
    // Create a new checkout COP based on the checkout request
    const checkoutCOP = new CheckoutCOP({
      userId: checkoutRequest.user,
      withdrawnCOPs: checkoutRequest.checkoutCOP,
    });
    await checkoutCOP.save();

    console.log("Checkout request and COP updated successfully");
    res.json({ message: "Requested checkout has been grandted succefully" });
  } catch (error) {
    console.error("Error updating checkout:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
