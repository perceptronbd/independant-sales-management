import mongoose from "mongoose";

const { Schema, model } = mongoose;

export const purchaseSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
});

export const Purchase = model("Purchase", purchaseSchema);
