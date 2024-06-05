import express from "express";
import { sendMail, getInboxMail } from "../controllers/mailController.js";
import authenticate from "../middleware/auth.js";
const router = express.Router();

router.post("/sendmail", authenticate, sendMail);
router.get("/getInboxMail", authenticate, getInboxMail);

export default router;
