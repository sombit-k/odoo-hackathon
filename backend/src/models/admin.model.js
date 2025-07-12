import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role: {
            type: String,
            enum: ["super_admin", "moderator", "content_manager"],
            default: "moderator",
        },
        permissions: {
            canApproveItems: {
                type: Boolean,
                default: true,
            },
            canRejectItems: {
                type: Boolean,
                default: true,
            },
            canRemoveItems: {
                type: Boolean,
                default: true,
            },
            canManageUsers: {
                type: Boolean,
                default: false,
            },
            canManageCategories: {
                type: Boolean,
                default: false,
            },
            canViewAnalytics: {
                type: Boolean,
                default: true,
            },
            canManageAdmins: {
                type: Boolean,
                default: false,
            }
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        lastLogin: {
            type: Date,
        },
        activityLog: [{
            action: {
                type: String,
                required: true,
            },
            targetType: {
                type: String,
                enum: ["item", "user", "swap", "category", "admin"],
            },
            targetId: {
                type: mongoose.Schema.Types.ObjectId,
                refPath: "activityLog.targetType",
            },
            details: {
                type: String,
                default: "",
            },
            timestamp: {
                type: Date,
                default: Date.now,
            }
        }],
        stats: {
            itemsApproved: {
                type: Number,
                default: 0,
            },
            itemsRejected: {
                type: Number,
                default: 0,
            },
            itemsRemoved: {
                type: Number,
                default: 0,
            },
            usersManaged: {
                type: Number,
                default: 0,
            }
        }
    },
    { timestamps: true }
);

// Index for better performance
adminSchema.index({ role: 1, isActive: 1 });

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
