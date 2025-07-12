import express from "express";
import {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
} from "../controllers/itemController.js";
// import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// List all approved items
router.get("/", getAllItems);

// Get single item details
router.get("/:id", getItemById);

// Create new item (logged-in users only)
// router.post("/", verifyToken, createItem);
router.post("/", createItem);

// Edit item (by owner or admin)
// router.put("/:id", verifyToken, updateItem);

// Delete item (by owner or admin)
// router.delete("/:id", verifyToken, deleteItem);

export default router;
