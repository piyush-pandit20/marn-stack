// import bcrypt from 'bcryptjs';
// import jwt from "jsonwebtoken";
// import User from "../models/user.model.js"; 

// // =========================================================
// // 1. Register Controller
// // =========================================================
// export const registerUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
        
//         if (!name || !email || !password) {
//             return res.status(400).json({ success: false, message: "All fields required" });
//         }

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ success: false, message: "User already exists" });
//         }

//         // Hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
        
//         const newUser = new User({
//             name,
//             email,
//             password: hashedPassword,
//             cartItems: {} 
//         });

//         const savedUser = await newUser.save();

//         // Create JWT Token
//         const token = jwt.sign(
//             { id: savedUser._id },
//             process.env.JWT_SECRET || "default_secret", 
//             { expiresIn: "7d" }
//         );

//         // Set token in HTTP-Only Cookie
//         res.cookie("token", token, {
//             httpOnly: true, 
//             secure: process.env.NODE_ENV === "production", 
//             maxAge: 7 * 24 * 60 * 60 * 1000, 
//             sameSite: "Lax" 
//         });
        
//         return res.status(201).json({ 
//             message: "User registered successfully ✅",
//             success: true, 
//             user: { _id: savedUser._id, name: savedUser.name, email: savedUser.email }
//         });

//     } catch (error) {
//         return res.status(500).json({ message: "Registration failed due to server error.", error: error.message });
//     }
// };

// // =========================================================
// // 2. Login Controller
// // =========================================================
// export const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
        
//         if (!email || !password) {
//             return res.status(400).json({ success: false, message: "Please enter email and password." });
//         }

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ success: false, message: "Invalid email or password." });
//         }

//         // Compare password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ success: false, message: "Invalid email or password." });
//         }

//         // Create JWT Token
//         const token = jwt.sign(
//             { id: user._id },
//             process.env.JWT_SECRET || "default_secret", 
//             { expiresIn: "7d" }
//         );

//         // Set token in HTTP-Only Cookie
//         res.cookie("token", token, {
//             httpOnly: true, 
//             secure: process.env.NODE_ENV === "production", 
//             maxAge: 7 * 24 * 60 * 60 * 1000, 
//             sameSite: "Lax"
//         });
        
//         return res.status(200).json({ 
//             message: "logged In successfully.",
//             success: true, 
//             user: { _id: user._id, name: user.name, email: user.email }
//         });

//     } catch (error) {
//         return res.status(500).json({ message: "Login failed due to internal server error.", error: error.message });
//     }
// };


// // =========================================================
// // 3. Logout Controller
// // =========================================================
// export const logoutUser = async (req, res) => {
//     try {
//         // Clear the token cookie
//         // Cookie attributes must match those set during login/register for successful deletion.
//         res.clearCookie("token", {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "Lax", 
//         });

//         res.json({ message: "User logged out successfully", success: true });
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// // =========================================================
// // 4. isAuthUser Controller
// // =========================================================
// // NOTE: This controller is only reached if the 'authuser' middleware passes the token check.
// export const isAuthUser = async (req, res) => {
//     try {
//         const userId = req.user; 
        
//         if (!userId) {
              
//              return res.status(401).json({ message: "Unauthorized", success: false });
//         }
 
//         const user=await User.findById(userId).select("-password  ");
//         res.json({ 
           
//             success: true ,
//             user,
//         });

//     } catch (error) {
//         res.status(500).json({ message: "Internal server error" });
//     }
// };
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; 

// =========================================================
// 1. Register Controller
// =========================================================
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            cartItems: {} 
        });

        const savedUser = await newUser.save();

        const token = jwt.sign(
            { id: savedUser._id },
            process.env.JWT_SECRET || "default_secret", 
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            sameSite: "Lax" 
        });
        
        return res.status(201).json({ 
            message: "User registered successfully ✅",
            success: true, 
            // ✅ Fix: cartItems ko response mein dala
            user: { 
                _id: savedUser._id, 
                name: savedUser.name, 
                email: savedUser.email,
                cartItems: savedUser.cartItems 
            }
        });

    } catch (error) {
        return res.status(500).json({ message: "Registration failed.", error: error.message });
    }
};

// =========================================================
// 2. Login Controller
// =========================================================
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter email and password." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password." });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || "default_secret", 
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            sameSite: "Lax"
        });
        
        return res.status(200).json({ 
            message: "logged In successfully.",
            success: true, 
            // ✅ Fix: cartItems ko response mein dala
            user: { 
                _id: user._id, 
                name: user.name, 
                email: user.email,
                cartItems: user.cartItems 
            }
        });

    } catch (error) {
        return res.status(500).json({ message: "Login failed.", error: error.message });
    }
};

// =========================================================
// 3. Logout Controller (NO CHANGE)
// =========================================================
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax", 
        });
        res.json({ message: "User logged out successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// =========================================================
// 4. isAuthUser Controller (NO CHANGE - already fetches full user)
// =========================================================
export const isAuthUser = async (req, res) => {
    try {
        const userId = req.user; 
        if (!userId) {
             return res.status(401).json({ message: "Unauthorized", success: false });
        }
        const user = await User.findById(userId).select("-password");
        res.json({ 
            success: true ,
            user,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};