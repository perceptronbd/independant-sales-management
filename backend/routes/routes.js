import express from "express";
import { login, logout, refresh } from "../controllers/auth.js";
import {
  createUser,
  deleteUser,
  getUsers,
} from "../controllers/crudController.js";
import { refCode } from "../controllers/refCode.js";
import {
  denyUserAccess,
  verifyManager,
  verifyUserforRefCode,
} from "../middlewares/verify.js";

const router = express.Router();

//Authentication
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refresh);

//User
router.post("/create-user", createUser);
router.get("/get-users/:refCode", getUsers);

//User restricted routes
router.get("/deny-user-access", denyUserAccess, (req, res) => {
  res.status(200).json({ message: "Access granted!" });
});

//Referral Code
router.post("/generate-ref-code", refCode);
router.get("/verify-user-for-refcode", verifyUserforRefCode, (req, res) => {
  res.status(200).json({ message: "Access granted!" });
});

//Manager
router.delete("/users/:userId", verifyManager, deleteUser);
router.get("/manager-route", verifyManager, (req, res) => {
  res.status(200).json({ message: "Access granted!" });
});

export default router;
