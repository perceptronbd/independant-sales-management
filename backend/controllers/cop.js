import { User } from "../model/user.js";

export const getAllEarnedCOPs = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("getAllEarnedCOPs:", userId);
    const user = await User.findById(userId).populate("earnedCOPs");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const earnedCOPs = user.earnedCOPs;

    let totalEarnedPoints = 0;

    earnedCOPs.forEach((cop) => {
      totalEarnedPoints += cop.earnedPoints;
    });

    res.status(200).json(totalEarnedPoints);
  } catch (error) {
    console.error("Error retrieving earnedCOPs:", error);
    res.status(500).json({ error: "Failed to retrieve earnedCOPs" });
  }
};
