import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import { connectDb } from "./src/lib/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import itemRoutes from "./src/routes/itemRoutes.js";
config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(json());

connectDb();

const PORT = process.env.PORT || 3000;

app.use("/api", userRoutes);
app.use("/api/items", itemRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
