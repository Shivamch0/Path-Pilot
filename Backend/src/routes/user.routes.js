import express from "express";
import { registerUser , loginUser , logoutUser , getRefreshToken , getRefreshToken } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(logoutUser);

router.route("/refreshToken").post(getRefreshToken);

export default router;

