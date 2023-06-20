import mongoose from "mongoose";

const { Schema, model } = mongoose;

const checkoutRequestSchema = Schema({
  checkoutCOP: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

export const CheckoutRequest = model("CheckoutRequest", checkoutRequestSchema);
