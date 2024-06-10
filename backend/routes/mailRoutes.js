import express from "express";
import {
  sendMail,
  getInboxMail,
  markAsRead,
  markAsDelete,
  getSentMail,
} from "../controllers/mailController.js";
import authenticate from "../middleware/auth.js";
const router = express.Router();

router.post("/sendmail", authenticate, sendMail);
router.get("/getInboxMail", authenticate, getInboxMail);
router.get("/getSentMail", authenticate, getSentMail);
router.post("/markAsRead/:emailId", markAsRead);
router.post("/markAsDelete/:emailId", markAsDelete);

export default router;
