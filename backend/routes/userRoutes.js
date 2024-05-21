import express from "express";
import { postSignup } from "../controllers/userController.js";
const router = express.Router();

router.post("/signup", postSignup);

export default router;
