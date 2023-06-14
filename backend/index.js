import express from "express";
import { db } from "./model/db.js";
import router from "./routes/routes.js";

const app = express();
const PORT = 3000;

db;

//user.save();

app.use(express.json());

app.use("/", router);

app.listen(5000, () => {
  console.log(`Server at http://localhost:${PORT}`);
});
