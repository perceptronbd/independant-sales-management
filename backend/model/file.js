import mongoose from "mongoose";

const { Schema, model } = mongoose;

const fileSchema = new Schema(
  {
    originalname: String,
    mimetype: String,
    size: Number,
    uploadedBy: {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      name: String,
    },
    filePath: String,
  },
  { timestamps: true }
);

export const File = model("File", fileSchema);
