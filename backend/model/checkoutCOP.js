import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = Schema({
  // Existing user schema fields

  earnedCOPs: [
    {
      type: Schema.Types.ObjectId,
      ref: "COP",
    },
  ],
  checkoutCOPs: [
    {
      type: Schema.Types.ObjectId,
      ref: "CheckoutCOP",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

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

export const User = model("User", userSchema);
export const CheckoutCOP = model("CheckoutCOP", checkoutCOPSchema);
