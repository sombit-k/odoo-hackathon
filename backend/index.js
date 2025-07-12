import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import { connectDb } from "./src/lib/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import itemRoutes from "./src/routes/itemRoutes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import categoryRoutes from "./src/routes/category.routes.js";
import path from "path";
import bodyParser from "body-parser"; // Add this import
config();

const app = express();

// Use body-parser with increased size limits
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(json());

connectDb();

const PORT = process.env.PORT || 3000;

// Serve uploaded images statically
app.use("/uploads", express.static(path.resolve("uploads")));

// Admin routes
app.use('/api/admin', adminRoutes);

// Category routes
app.use('/api/categories', categoryRoutes);

app.use("/api", userRoutes);
app.use("/api/items", itemRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
