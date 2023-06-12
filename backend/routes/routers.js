import express from "express";
import { login, logout, refresh } from "../controllers/auth.js";
import { createUser } from "../controllers/createUser.js";
import { refCode } from "../controllers/refCode.js";
import { checkRole } from "../middlewares/checkRole.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refresh);
router.post("/create-user", createUser);
router.post("/generate-ref-code", checkRole, refCode);

export default router;
