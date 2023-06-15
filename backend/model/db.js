import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./product.js";

dotenv.config();

mongoose.connect(`${process.env.MONGO_URI}plutoMLM`);

export const db = mongoose.connection;

const product = new Product({
  name: "Product 10",
  category: "Category 3",
  price: 19.99,
});

// await product
//   .save()
//   .then(() => {
//     console.log("Product saved successfully!");
//     db.close();
//   })
//   .catch((error) => {
//     console.error("Error saving product:", error);
//     db.close();
//   });

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB successfully!");
});
