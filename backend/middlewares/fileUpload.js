import multer from "multer";
import mimeTypes from "mime-types";

// Define storage options and file filter
export const storage = multer.diskStorage({
  destination: "./uploads/", // Set the destination folder for uploaded files
  filename: (req, file, callback) => {
    const fileExtension = mimeTypes.extension(file.mimetype);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, uniqueSuffix + "." + fileExtension);
  },
});

export const fileFilter = (req, file, callback) => {
  const allowedMimeTypes = [
    "application/vnd.ms-excel",
    "application/pdf",
    "text/plain",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    callback(null, true); // Accept the file
  } else {
    callback(
      new Error(
        "Invalid file type. Only Excel, PDF, and text files are allowed."
      )
    );
  }
};
