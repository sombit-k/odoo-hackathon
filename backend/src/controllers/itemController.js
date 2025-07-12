import Item from "../models/item.model.js";

// GET /api/items
export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find({ status: "approved", isAvailable: true });
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/items/:id
export const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /api/items
export const createItem = async (req, res) => {
    try {
        console.log(req.user.userId);
        const item = new Item({
            ...req.body,
            owner: req.user.userId,
        });
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

