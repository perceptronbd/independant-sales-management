import { User } from "../model/user.js";

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
