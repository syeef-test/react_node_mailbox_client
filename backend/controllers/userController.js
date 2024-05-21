import { Auth } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const postSignup = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({ message: "Send all required fields" });
    }

    const data = await Auth.find({ email: req.body.email });
    if (Object.keys(data).length === 0) {
      const saltrounds = 10;
      const hash = await bcrypt.hash(req.body.password, saltrounds);

      const newUser = {
        email: req.body.email,
        password: hash,
      };

      const response = await Auth.create(newUser);

      if (!response) {
        return res.status(500).send({ message: "Failed to create user" });
      }

      return res.status(200).send(response);
    } else {
      return res
        .status(500)
        .send({ message: "Failed to create user as same email exist" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};
