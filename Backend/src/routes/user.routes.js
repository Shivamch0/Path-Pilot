import express from "express";
import { registerUser , logoutUser } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/register").post(registerUser)

export default router;

