import express from "express";
import { login, logout, refresh } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refresh);

export default router;
