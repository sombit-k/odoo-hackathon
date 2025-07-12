import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./src/lib/db.js";

// Load environment variables first
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
})