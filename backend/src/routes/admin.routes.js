import express from 'express';
import {
    listItemsForModeration,
    approveOrRejectItem,
    removeItem
} from '../controllers/admin.controllers.js';

const router = express.Router();

// List all items (for moderation)
router.get('/items', listItemsForModeration);

// Approve or reject an item
router.put('/items/:id', approveOrRejectItem);

// Remove inappropriate item
router.delete('/items/:id', removeItem);



export default router;
