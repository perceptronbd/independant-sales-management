import { User } from "../model/user.js";

const createUser = async (req, res) => {
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
      return res.status(409).json({ error: "User already exists." });
    }

    const newUser = new User({
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
    });

    const savadUser = await newUser.save();
  } catch (error) {
    console.log("error in createUser controller", error);
  }
};
