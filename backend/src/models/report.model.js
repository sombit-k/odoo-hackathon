import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["spam", "inappropriate", "fake", "damaged", "other"],
            required: true,
        },
        reporter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        reportedItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
            default: null,
        },
        reportedUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        reportedSwap: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Swap",
            default: null,
        },
        reason: {
            type: String,
            required: true,
            maxlength: 500,
        },
        evidence: [{
            type: String, // URLs to uploaded evidence images
        }],
        status: {
            type: String,
            enum: ["pending", "under_review", "resolved", "dismissed"],
            default: "pending",
        },
        adminNotes: {
            type: String,
            default: "",
        },
        actionTaken: {
            type: String,
            enum: ["none", "warning", "item_removed", "user_suspended", "user_banned"],
            default: "none",
        },
        reviewedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            default: null,
        },
        reviewedAt: {
            type: Date,
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high", "critical"],
            default: "medium",
        }
    },
    { timestamps: true }
);

// Indexes for better query performance
reportSchema.index({ status: 1, priority: 1, createdAt: -1 });
reportSchema.index({ reporter: 1 });
reportSchema.index({ reportedItem: 1 });
reportSchema.index({ reportedUser: 1 });

const Report = mongoose.model("Report", reportSchema);

export default Report;
