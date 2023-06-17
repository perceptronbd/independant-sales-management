import mongoose from "mongoose";

const { Schema, model } = mongoose;

const copSchema = Schema(
  {
    refCode: {
      type: String,
      required: true,
    },
    earnedPoints: {
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

export const COP = model("COP", copSchema);
