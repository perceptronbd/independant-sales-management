import multer from "multer";
import { File } from "../model/file.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, extname, join, basename } from "path";

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

  const { userId, name } = req.body;

  // Perform any necessary file processing or validation here

  // Create a new file document using the file model
  const file = new File({
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    filePath: req.file.path,
    uploadedBy: { userId, name }, // Assuming the user name is stored in req.user.name
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

export const getAllFiles = async (req, res) => {
  try {
    // Retrieve all files from the database
    const files = await File.find()
      .populate("uploadedBy.userId", "name") // Populate the user's name
      .select("originalname createdAt uploadedBy.name");

    // Extract only the date portion from the createdAt timestamp
    const formattedFiles = files.map((file) => ({
      id: file._id,
      originalname: file.originalname,
      createdAt: file.createdAt.toISOString().split("T")[0],
      uploadedBy: file.uploadedBy.name,
    }));

    // Return the formatted file details in the response
    res.json(formattedFiles);
  } catch (error) {
    console.error("Error retrieving files:", error);
    res.status(500).json({ error: "Failed to retrieve files" });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const fileId = req.params.fileId;

    // Find the file by ID in the database
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    const filePath = file.filePath.replace(/\\/g, "/"); // Replace backslashes with forward slashes
    const fileName = basename(file.originalname); // Extract the actual file name

    // Get the current module's file path
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDirPath = dirname(currentFilePath);

    // Generate the file download path
    const downloadPath = join(currentDirPath, "..", filePath);

    console.log("Download Path:", downloadPath); // Debugging line

    // Set the appropriate headers for the file download
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", file.mimetype);
    res.setHeader("Content-Length", file.size);

    // Send the file as a download attachment
    res.sendFile(downloadPath);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ error: "Failed to download file" });
  }
};
