import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, {
    expiresIn: "5s",
  });
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY);
};
