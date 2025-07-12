// backend/src/Routes/userRoutes.js

import { Router } from "express";
const router = Router();
import User, { findOne } from "../models/User";
import { ClerkExpressWithAuth, users } from "@clerk/clerk-sdk-node";

router.post("/save-user", ClerkExpressWithAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;

    const clerkUser = await users.getUser(userId);

    const email = clerkUser.emailAddresses[0]?.emailAddress || "";
    const firstName = clerkUser.firstName || "";
    const lastName = clerkUser.lastName || "";

    let user = await findOne({ clerkId: userId });

    if (!user) {
      user = new User({
        clerkId: userId,
        email,
        firstName,
        lastName,
      });
    } else {
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;
    }

    await user.save();

    res.json({
      success: true,
      message: "User saved to MongoDB",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save user" });
  }
});

export default router;
