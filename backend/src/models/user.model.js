import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: { type: Boolean, default: false },
  role: { type: String, default: "user" },
  points: {
    type: Number,
    default: 100  // Start with 100 or 0 as you prefer
  } // optional for admin access
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
