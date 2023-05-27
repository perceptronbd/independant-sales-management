import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./settings/db.js";

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Server is ready");
});

connectDB();

app.listen(5000, () => {
  console.log(`Server at http://localhost:${port}`);
});
