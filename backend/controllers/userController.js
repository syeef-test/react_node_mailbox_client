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

export const generateAccessToken = (id, name) => {
  return jwt.sign({ userId: id, name: name }, process.env.TOKEN_SECRET);
};

export const postLogin = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({ message: "Send all required fields" });
    }

    const response = await Auth.findOne({ email: req.body.email });

    if (!response) {
      return res.status(500).send({ message: "Failed to signin" });
    }

    if (response && Object.keys(response).length > 0) {
      const match = bcrypt.compareSync(req.body.password, response.password);

      if (match) {
        return res.status(200).send({
          message: "Signin succesful",
          token: generateAccessToken(response._id, response.name),
          name: response.name,
          userId: response._id,
          email: response.email,
        });
      } else {
        return res.status(500).send({ message: "Failed to signin" });
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};
