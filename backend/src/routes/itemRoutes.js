import express from "express";
import {
    getAllItems,
    getItemById,
    createItem,
    getUserItems
} from "../controllers/itemController.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";
const router = express.Router();

// List all approved items
router.get("/all", getAllItems);


// List items for the logged-in user
router.get("/", userMiddleware, getUserItems);

// Get single item details
router.get("/:id", getItemById);

// Create new item (logged-in users only)
router.post("/", userMiddleware, createItem);

export default router;
