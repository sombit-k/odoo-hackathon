import express from "express";
import {
    getAllItems,
    getItemById,
    createItem,
} from "../controllers/itemController.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";
// import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// List all approved items
router.get("/", getAllItems);

// Get single item details
router.get("/:id", getItemById);

// Create new item (logged-in users only)
router.post("/", userMiddleware, createItem);
// router.post("/", createItem);


export default router;
