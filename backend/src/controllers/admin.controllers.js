import Item from '../models/item.model.js';

// List all items (for moderation)
export const listItemsForModeration = async (req, res) => {
    try {
        const items = await Item.find();
        res.json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Approve or reject an item
export const approveOrRejectItem = async (req, res) => {
    try {
        const { status } = req.body; // status: 'approved' or 'rejected'
        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const item = await Item.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }

        res.json({ success: true, message: `Item ${status}`, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Remove inappropriate item
export const removeItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        res.json({ success: true, message: 'Item removed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
