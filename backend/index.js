import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./src/lib/db.js";
import itemRoutes from "./src/routes/itemRoutes.js";
// Load environment variables first
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/items", itemRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
})