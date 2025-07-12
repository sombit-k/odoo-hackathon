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
        const item = new Item({
            ...req.body,
            // owner: req.user.id,
            owner: "60d0fe4f5311236168a109ca", // Placeholder for owner ID, replace with actual user ID from auth middleware
        });
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT /api/items/:id
export const updateItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });

        if (item.owner.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        Object.assign(item, req.body);
        const updatedItem = await item.save();
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE /api/items/:id
export const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });

        // if (item.owner.toString() !== req.user.id && req.user.role !== "admin") {
        //     return res.status(403).json({ message: "Unauthorized" });
        // }

        await Item.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
