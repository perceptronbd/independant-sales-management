import { User } from "../model/user.js";

export const createUser = async (req, res) => {
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
      return res
        .status(409)
        .json({ error: "User with this email already exists!" });
    } else if (role === "Select Role") {
      return res.status(409).json({ error: "Please select a user role!" });
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      role,
      address,
      city,
      state,
      postalCode,
      referralID,
    });
    const savedUser = await newUser.save();
    res.status(201).json(`created user succesffully: ${savedUser}`);
  } catch (error) {
    console.log("error in createUser controller", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};
