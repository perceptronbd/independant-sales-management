import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "../model/user.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helpers/generateTokens.js";

dotenv.config();

let refreshTokens = [];

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        console.log("Login successful for user:", user);
        res.json({ ...user._doc, accessToken, refreshToken });
      } else {
        console.log("Invalid password for user:", user);
        res.status(400).json({ mesage: "Password is incorrect!" });
      }
    } else {
      console.log("User not found for email:", email);
      res.status(400).json({ mesage: "Username is incorrect!" });
    }
  } catch (error) {
    console.error("Error retrieving user from the database:", error);
    res.status(500).json({ mesage: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res.status(200).json("Logged out successfully!");
};

export const refresh = (req, res) => {
  //take the refresh token from the user
  const refreshToken = req.body.token;

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  if (!refreshTokens.includes(refreshToken)) {
    console.log("refreshToken: ", refreshToken);
    return res.status(403).json("Refresh token is not valid!");
  }
  jwt.verify(refreshToken, process.env.SECRET_KEY, (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
};
