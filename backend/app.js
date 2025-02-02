import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import mailRoutes from "./routes/mailRoutes.js";

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to mailbox client");
});

app.use("/api/auth", userRoutes);
app.use("/api/mail", mailRoutes);

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server is running on PORT:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer();
