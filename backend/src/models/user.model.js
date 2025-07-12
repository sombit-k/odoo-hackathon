import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phoneNumber: String,
  password: String,
  role: { type: String, default: "user" }, // optional for admin access
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
