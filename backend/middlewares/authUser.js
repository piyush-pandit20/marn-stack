
import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; 

export const authuser = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        // 🚨 YE CHECK ZAROORI HAI: Agar token nahi hai toh yahi se rok do
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Unauthorized: No token provided" 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
        
        // decoded.id se user ko find kiya
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ 
                message: "Unauthorized: User not found", 
                success: false
            });
        }
        
        // ✅ Ab req.user._id bilkul sahi kaam karega updateCart controller mein
        req.user = user; 
        next();
        
    } catch (error) {
        return res.status(401).json({ 
            success: false, 
            message: "Invalid or expired token",
            error: error.message 
        });
    }
}
