import express from "express";
import {
    getAllItems,
    getItemById,
    createItem,
} from "../controllers/itemController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// List all approved items
router.get("/", getAllItems);

// Get single item details
router.get("/:id", getItemById);

// Create new item (logged-in users only)
router.post("/", authMiddleware, createItem);


export default router;
