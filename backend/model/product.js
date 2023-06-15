import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Product = model("Product", productSchema);
