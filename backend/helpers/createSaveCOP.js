import { COP } from "../model/COP.js";
import { User } from "../model/user.js";

export const createAndSaveCOP = async (refCode, earnedPoints, userId) => {
  console.log("createAndSaveCOP - Start");
  console.log("refCode:", refCode);
  console.log("earnedPoints:", earnedPoints);
  console.log("userId:", userId);

  const cop = new COP({
    refCode,
    earnedPoints,
    user: userId,
  });

  console.log("COP object:", cop);

  try {
    await cop.save();
    console.log("COP saved to the database");

    await User.findByIdAndUpdate(userId, {
      $push: { earnedCOPs: cop._id },
    });

    console.log("User's earnedCOPs array updated");
  } catch (error) {
    console.error("Error saving COP:", error);
    throw error; // Rethrow the error to be caught and handled by the calling function
  }

  console.log("createAndSaveCOP - End");
};
