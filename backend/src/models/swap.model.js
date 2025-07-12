import mongoose from "mongoose";

const swapSchema = new mongoose.Schema(
    {
        requester: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        requestedItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
            required: true,
        },
        offeredItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
            default: null, // null for points-based swaps
        },
        pointsOffered: {
            type: Number,
            default: 0,
        },
        swapType: {
            type: String,
            enum: ["item_for_item", "points_for_item", "item_for_points"],
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
            default: "pending",
        },
        message: {
            type: String,
            maxlength: 500,
            default: "",
        },
        ownerResponse: {
            type: String,
            maxlength: 500,
            default: "",
        },
        meetingDetails: {
            location: {
                type: String,
                default: "",
            },
            dateTime: {
                type: Date,
            },
            notes: {
                type: String,
                default: "",
            }
        },
        tracking: {
            acceptedAt: {
                type: Date,
            },
            completedAt: {
                type: Date,
            },
            cancelledAt: {
                type: Date,
            },
            cancellationReason: {
                type: String,
                default: "",
            }
        },
        ratings: {
            requesterRating: {
                rating: {
                    type: Number,
                    min: 1,
                    max: 5,
                },
                comment: {
                    type: String,
                    maxlength: 300,
                    default: "",
                },
                ratedAt: {
                    type: Date,
                }
            },
            ownerRating: {
                rating: {
                    type: Number,
                    min: 1,
                    max: 5,
                },
                comment: {
                    type: String,
                    maxlength: 300,
                    default: "",
                },
                ratedAt: {
                    type: Date,
                }
            }
        },
        isDisputed: {
            type: Boolean,
            default: false,
        },
        disputeReason: {
            type: String,
            default: "",
        }
    },
    { timestamps: true }
);

// Indexes for better query performance
swapSchema.index({ requester: 1, status: 1 });
swapSchema.index({ owner: 1, status: 1 });
swapSchema.index({ requestedItem: 1 });
swapSchema.index({ createdAt: -1 });

const Swap = mongoose.model("Swap", swapSchema);

export default Swap;
