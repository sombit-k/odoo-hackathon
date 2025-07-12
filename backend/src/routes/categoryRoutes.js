import express from "express";
import {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/categoryController.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// Protected routes (admin only - for now just authenticated users)
router.post("/",  createCategory);
router.put("/:id",  updateCategory);
router.delete("/:id",  deleteCategory);

export default router;
