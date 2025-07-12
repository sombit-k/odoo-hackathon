import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        token
    });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ user, token });
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { name, email, phoneNumber } = req.body;
        
        // Check if email is being changed and if it's already taken
        if (email) {
            const existingUser = await User.findOne({ email, _id: { $ne: req.userId } });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }
        }
        
        const user = await User.findByIdAndUpdate(
            req.userId,
            { name, email, phoneNumber },
            { new: true }
        ).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
