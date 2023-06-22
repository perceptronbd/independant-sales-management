import express from "express";
import { login, logout, refresh } from "../controllers/auth.js";
import {
  createUser,
  deleteUser,
  findUser,
  getUserForAgent,
  getUserForManager,
  getUserTree,
  getUsersWithPurchaseInfo,
  updateUser,
} from "../controllers/users.js";
import {
  createProduct,
  createPurchase,
  getAllProducts,
  getLastPurchase,
  getOrderHistory,
  getTotalPurchasesToday,
  getRecentPurchases,
  getWeeklySum,
} from "../controllers/productsAndPurchases.js";
import { denyUserFormAccess, verifyManager } from "../middlewares/verify.js";
import {
  createCheckoutRequest,
  deleteCheckoutRequest,
  getAllEarnedCOPs,
  getAvailableCOPs,
  getCheckoutReq,
  updateCheckout,
} from "../controllers/cop.js";
import { checkoutCOP } from "../middlewares/checkoutCOP.js";
import {
  downloadFile,
  getAllFiles,
  upload,
  uploadFile,
} from "../controllers/fileController.js";

const router = express.Router();

// Root route request
router.get("/", (req, res) => {
  res.send("Hello, World!");
});

//Authentication & Authorization
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refresh);

//User
router.post("/create-user", createUser);
router.get("/get-users-for-purchase", getUsersWithPurchaseInfo);
router.post("/get-user-tree", getUserTree);
router.get("/get-user-by-refCode/:refCode");
router.get("/find-user/:userId", findUser);
router.get("/get-user-for-agent/:userId", getUserForAgent);

//User restricted routes
router.get("/deny-user-access", denyUserFormAccess, (req, res) => {
  res.status(200).json({ message: "Access granted!" });
});

//Manager
router.delete("/users/:userId", verifyManager, deleteUser);
router.get("/manager-route", verifyManager, (req, res) => {
  res.status(200).json({ message: "Access granted!" });
});
router.get("/get-users", getUserForManager);
router.put("/update-user/:userId", updateUser);

//Products & Purchase
router.get("/products", getAllProducts);
router.post("/purchase", createPurchase);
router.post("/last-purchase", getLastPurchase);
router.get("/get-order-history", getOrderHistory);
router.post("/create-products", createProduct);
router.get("/purchases/recent", getRecentPurchases);
router.get("/purchases/sum", getTotalPurchasesToday);
router.get("/weekly-result", getWeeklySum);

//COPs
router.get("/users/:userId/earnedCOPs", getAllEarnedCOPs);
router.get("/users/:userId/availableCOPs", getAvailableCOPs);
router.post("/req-checkout", checkoutCOP, createCheckoutRequest);
router.get("/get-checkout-req", getCheckoutReq);
router.post("/update-checkout/:userId", updateCheckout);
router.delete("deleteCheckoutReq/:id", deleteCheckoutRequest);

//files
router.post("/upload", upload.single("file"), uploadFile);
router.get("/get-files", getAllFiles);
router.get("/download/:fileId", downloadFile);

export default router;
