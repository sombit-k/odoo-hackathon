import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        description: {
            type: String,
            required: true,
            maxlength: 1000,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        type: {
            type: String,
            enum: ["swap", "points", "both"],
            default: "both",
        },
        size: {
            type: String,
            enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "One Size", "Custom"],
            default: "One Size",
        },
        condition: {
            type: String,
            enum: ["New", "Like New", "Good", "Fair", "Poor"],
            required: true,
        },
        images: [{
            type: String,
            required: true,
        }],
        tags: [{
            type: String,
            trim: true,
        }],
        pointsValue: {
            type: Number,
            default: 0,
            min: 0,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected", "available", "swapped", "reserved"],
            default: "pending",
        },
        isAvailable: {
            type: Boolean,
            default: false,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        views: {
            type: Number,
            default: 0,
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
        location: {
            city: {
                type: String,
                default: "",
            },
            state: {
                type: String,
                default: "",
            },
            country: {
                type: String,
                default: "",
            }
        },
        swapPreferences: {
            lookingFor: [{
                type: String,
                trim: true,
            }],
            preferredCategories: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
            }],
        },
        adminNotes: {
            type: String,
            default: "",
        },
        rejectionReason: {
            type: String,
            default: "",
        },
        approvedAt: {
            type: Date,
        },
        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
        }
    },
    { timestamps: true }
);

// Index for better search performance
itemSchema.index({ title: "text", description: "text", tags: "text" });
itemSchema.index({ category: 1, status: 1, isAvailable: 1 });
itemSchema.index({ owner: 1, status: 1 });
itemSchema.index({ createdAt: -1 });

const Item = mongoose.model("Item", itemSchema);

export default Item;
