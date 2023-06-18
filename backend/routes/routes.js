import express from "express";
import { login, logout, refresh } from "../controllers/auth.js";
import {
  createUser,
  deleteUser,
  getUserForManager,
  getUserTree,
  getUsersWithPurchaseInfo,
} from "../controllers/users.js";
import {
  createPurchase,
  getAllProducts,
  getLastPurchase,
} from "../controllers/productsAndPurchases.js";
import { denyUserFormAccess, verifyManager } from "../middlewares/verify.js";
import { getAllEarnedCOPs } from "../controllers/cop.js";

const router = express.Router();

// Root route request
router.get("/", (req, res) => {
  res.send("Hello, World!");
});

//Authentication
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refresh);

//User
router.post("/create-user", createUser);
router.get("/get-users/:refCode", getUsersWithPurchaseInfo);
router.post("/get-user-tree", getUserTree);
router.get("/get-user-by-refCode/:refCode");

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

//Products & Purchase
router.get("/products", getAllProducts);
router.post("/purchase", createPurchase);
router.post("/last-purchase", getLastPurchase);

//COPs
router.get("/users/:userId/earnedCOPs", getAllEarnedCOPs);

export default router;
