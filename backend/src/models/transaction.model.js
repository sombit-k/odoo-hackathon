import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            enum: ["earn", "spend", "refund", "bonus", "penalty"],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        relatedSwap: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Swap",
            default: null,
        },
        relatedItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
            default: null,
        },
        balanceBefore: {
            type: Number,
            required: true,
        },
        balanceAfter: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["completed", "pending", "failed", "reversed"],
            default: "completed",
        },
        processedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            default: null,
        },
        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        }
    },
    { timestamps: true }
);

// Indexes for better query performance
transactionSchema.index({ user: 1, createdAt: -1 });
transactionSchema.index({ type: 1, status: 1 });
transactionSchema.index({ relatedSwap: 1 });

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
