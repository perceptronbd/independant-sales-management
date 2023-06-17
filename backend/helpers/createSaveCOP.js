import { COP } from "../model/COP.js";

export const createAndSaveCOP = async (refCode, earnedPoints, userId) => {
  const cop = new COP({
    refCode,
    earnedPoints,
    user: userId,
  });

  await cop.save();
  await User.findByIdAndUpdate(userId, {
    $push: { earnedCOPs: cop._id },
  });
};
