import mongoose from "mongoose";

const { Schema, model } = mongoose;

const fileSchema = new Schema(
  {
    originalname: String,
    mimetype: String,
    size: Number,
    filePath: String,
  },
  { timestamps: true }
);

export const File = model("File", fileSchema);
