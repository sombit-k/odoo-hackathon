import express from "express";
import {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} from "../controllers/categoryController.js";

const router = express.Router();

// Create a new category
router.post('/', createCategory);

// Get all categories
router.get('/', getAllCategories);

// Get a single category by ID
router.get('/:id', getCategoryById);

// Update a category by ID
router.put('/:id', updateCategory);

// Delete a category by ID
router.delete('/:id', deleteCategory);

export default router;
