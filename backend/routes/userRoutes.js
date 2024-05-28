import express from "express";
import { postSignup, postLogin } from "../controllers/userController.js";
const router = express.Router();

router.post("/signup", postSignup);
router.post("/signin", postLogin);

export default router;
