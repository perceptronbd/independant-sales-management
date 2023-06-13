import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../model/user.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helpers/generateTokens.js";

dotenv.config();

let refreshTokens = [];

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      refreshTokens.push(refreshToken);
      res.json({ ...user._doc, accessToken, refreshToken });
    } else {
      res.status(400).json("Username or Password is incorrect!");
    }
  } catch (error) {
    console.error("Error retrieving user from the database", error);
    res.status(500).json("internal server error");
  }
};

export const logout = (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(400).json("Refresh token not provided!");
  }

  const tokenIndex = refreshTokens.indexOf(refreshToken);

  if (tokenIndex == -1) {
    return res.status(401).json("Invalid refresh token!");
  }

  refreshTokens.splice(tokenIndex, 1);

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
