// backend/models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: String,
  firstName: String,
  lastName: String,
});

const User = mongoose.model("User", userSchema);

export default User;
