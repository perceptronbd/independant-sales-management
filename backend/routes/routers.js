import express from "express";
import { login, logout, refresh } from "../controllers/auth.js";
import { createUser } from "../controllers/createUser.js";
import { refCode } from "../controllers/refCode.js";
import { verifyManager, verifyUserforRefCode } from "../middlewares/verify.js";
import { deleteUser } from "../controllers/deleteUser.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refresh);
router.post("/create-user", createUser);
router.post("/generate-ref-code", refCode);
router.delete("/users/:userId", verifyManager, deleteUser);
router.get("/manager-route", verifyManager, (req, res) => {
  res.status(200).json({ message: "Access granted!" });
});
router.get("/verify-user-for-refcode", verifyUserforRefCode, (req, res) => {
  res.status(200).json({ message: "Access granted!" });
});

export default router;
