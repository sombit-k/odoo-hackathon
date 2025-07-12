import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const userMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Contains userId
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
