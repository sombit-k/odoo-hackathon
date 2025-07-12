import express from "express";
import {
    getAllItems,
    getItemById,
    createItem,
    updateItem,      // <-- add this
    deleteItem       // <-- add this
} from "../controllers/itemController.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import {userMiddleware} from "../middlewares/userMiddleware.js";

// Ensure uploads directory exists
const uploadDir = path.resolve("uploads/items");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for local storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

const router = express.Router();

// List all approved items
router.get("/", getAllItems);

// Get single item details
router.get("/:id", getItemById);

// Create new item with local image upload
router.post("/", userMiddleware, upload.array("images", 5), createItem);

// Edit item (by owner or admin)
router.put("/:id", updateItem);

// Delete item (by owner or admin)
router.delete("/:id", deleteItem);

export default router;