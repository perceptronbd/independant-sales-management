import express from "express";
import { db } from "./model/db.js";
import router from "./routes/routers.js";
import { User } from "./model/user.js";

const app = express();
const port = 5000;

db;

const user = new User({
  username: "john",
  email: "joh@example.com",
  password: "password123",
  role: "user",
  contactNumber: "1234567890",
  profilePicture: "profile.jpg",
});

//user.save();

app.use(express.json());

app.use("/", router);

app.listen(5000, () => {
  console.log(`Server at http://localhost:${port}`);
});
