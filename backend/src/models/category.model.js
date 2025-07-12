import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
        },
        icon: {
            type: String,
            default: "",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        parentCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: null,
        },
        subcategories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        }],
        itemCount: {
            type: Number,
            default: 0,
        }
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
