import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import { connectDb } from "./src/lib/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import itemRoutes from "./src/routes/itemRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";

config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);
app.use(json());

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/categories", categoryRoutes);

// Connect to database and start server
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });
