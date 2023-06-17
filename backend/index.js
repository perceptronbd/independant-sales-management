import express from "express";
import cors from "cors";
import { db } from "./model/db.js";
import router from "./routes/routes.js";

const app = express();
const PORT = 5000;

db;

//user.save();

app.use(express.json());
app.use(cors());

app.use("/", router);

app.listen(PORT, async () => {
  console.log("server is running");
});
