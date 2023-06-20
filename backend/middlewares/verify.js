import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../model/user.js";

dotenv.config();

export const verifyManager = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          console.log("err in verify: ", err);
          return res.status(403).json("Token is not valid!");
        }
        req.user = user;

        //checking if the user has access to the route
        if (req.user.role !== "manager") {
          return res.status(401).json("Access Denied!");
        }

        next();
      });
    } else {
      res.status(401).json("You are not authenticated!");
    }
  } catch (error) {
    console.error("Error in varifyAdmin: ", error);
  }
};

export const denyUserFormAccess = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          console.error("denyUserAccess controller: ", err);
          return res.status(403).json("Invalid Token!");
        }
        if (
          user.role === "user" ||
          user.role === "co-user" ||
          user.role === "prescriptor"
        ) {
          return res.status(401).json("Access Denied!");
        }
        next();
      });
    } else {
      return res.status(401).json("Unauthorized!");
    }
  } catch (error) {
    console.error("denyUserAccess controller: ", error);
  }
};

export const getAccess = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (
      user.role === "manager" ||
      user.role === "user" ||
      user.role === "co-user"
    ) {
      return res.status(401).json("Access deneid!");
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
