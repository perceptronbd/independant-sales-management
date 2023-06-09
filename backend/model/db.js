import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(`${process.env.MONGO_URI}plutoMLM`);

export const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB successfully!");
});
