import mongoose from "mongoose";

const { Schema, model } = mongoose;

const checkoutCOPSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    withdrawnCOPs: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { immutable: true }
);
export const CheckoutCOP = model("CheckoutCOP", checkoutCOPSchema);
