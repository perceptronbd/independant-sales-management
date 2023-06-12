import { User } from "../model/user.js";
import { generateRefCode } from "../helpers/generateRefCode.js";

export const refCode = async (req, res) => {
  try {
    const { _id } = req.body;

    const user = await User.findById(_id);
    console.log(_id);

    if (!user.refCode) {
      const referralCode = generateRefCode(_id);

      user.refCode = referralCode;

      await user.save();
    }

    res.json({ ...user._doc });
  } catch (error) {
    console.error("Error generating referral code: ", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
