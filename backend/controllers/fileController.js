import multer from "multer";
import { File } from "../model/file.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory where the uploaded files will be stored
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
  },
});

// Configure multer upload
export const upload = multer({ storage });

export const uploadFile = async (req, res) => {
  // Access the uploaded file via req.file
  if (!req.file) {
    console.log("No file provided");
    return res.status(400).json({ error: "No file provided" });
  }

  console.log("Uploaded file:", req.file);

  // Perform any necessary file processing or validation here

  // Create a new file document using the file model
  const file = new File({
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    filePath: req.file.path,
  });

  try {
    // Save the file document to the database
    const savedFile = await file.save();
    console.log("Saved file:", savedFile);

    // Return a success response with the saved file document
    res.json({ message: "File uploaded successfully", file: savedFile });
  } catch (error) {
    // Handle any errors that occur during the save operation
    console.error("Error saving file:", error);
    res.status(500).json({ error: "Failed to save file" });
  }
};
