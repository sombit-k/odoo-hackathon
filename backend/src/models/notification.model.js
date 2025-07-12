import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        type: {
            type: String,
            enum: [
                "swap_request", 
                "swap_accepted", 
                "swap_rejected", 
                "swap_completed",
                "item_approved", 
                "item_rejected", 
                "item_liked",
                "points_earned", 
                "points_spent",
                "new_message",
                "system_announcement"
            ],
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        relatedItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
            default: null,
        },
        relatedSwap: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Swap",
            default: null,
        },
        relatedTransaction: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction",
            default: null,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        readAt: {
            type: Date,
        },
        actionUrl: {
            type: String,
            default: "",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high", "urgent"],
            default: "medium",
        },
        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        }
    },
    { timestamps: true }
);

// Indexes for better query performance
notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ type: 1, createdAt: -1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
