import jwt from "jsonwebtoken";
import { Auth } from "../models/userModel.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("authorization");
    //console.log("auth:", token);
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    //console.log("User Details:", user.userId);

    const foundUser = await Auth.findById(user.userId);

    if (!foundUser) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    req.user = foundUser;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ success: false, message: "Authentication failed" });
  }
};

export default authenticate;
