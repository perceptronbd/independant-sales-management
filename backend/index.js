import express from "express";
import cors from "cors";
import { db } from "./model/db.js";
import router from "./routes/routes.js";
import { User } from "./model/user.js";
import bcrypt from "bcryptjs";

const app = express();
const PORT = 5000;

db;

app.use(express.json());
app.use(cors());

app.use("/", router);

app.listen(PORT, async () => {
  console.log("server is running");
});
