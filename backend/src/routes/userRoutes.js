import express from "express";
import { signup, login, getMe, updateUser } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth routes
router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.get("/auth/me", authMiddleware, getMe);
router.put("/user", authMiddleware, updateUser);
router.post("/auth/logout", (req, res) => {
  // Since we're using JWT, logout is handled client-side
  res.json({ message: "Logged out successfully" });
});

export default router;
