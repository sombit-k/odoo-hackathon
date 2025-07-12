import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDb } from "./src/lib/db.js";
import categoryRoutes from "./src/routes/category.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Add this to parse JSON bodies


// Admin routes
app.use('/api/admin', adminRoutes);

// Category routes
app.use('/api/categories', categoryRoutes);



// Add this route for root path
app.get('/', (req, res) => {
  res.send(`Server is running on port ${PORT}!`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});

