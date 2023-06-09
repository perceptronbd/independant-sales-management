import { jwt } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }
      req.user = user;

      //checking if the user has access to the route
      //   if (req.user.role !== role) {
      //     return res
      //       .status(401)
      //       .json("You are not allowed to access this rouute!");
      //   }

      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};
