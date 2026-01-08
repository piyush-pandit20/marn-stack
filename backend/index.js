import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/connectDB.js";
import User from "./models/user.model.js";
import useRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import orderRoute from "./routes/order.routes.js";
import addressRoute from "./routes/address.routes.js";
import productroutes from "./routes/productroutes.js";
import cartroutes from "./routes/cart.routes.js";
import { connectCloudinary } from "./config/cloudinary.js";

const app = express();

/* ================= PATH FIX ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= DB & CLOUDINARY ================= */
connectDB();
connectCloudinary();

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

/* ================= AUTH MIDDLEWARE ================= */
export const authuser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found", success: false });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token", success: false });
  }
};

/* ================= REGISTER ================= */
app.post("/api/user/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, cartItems: {} });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "default_secret", { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ success: true, message: "User registered successfully", user: { _id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ================= LOGIN ================= */
app.post("/api/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "default_secret", { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, message: "Logged in successfully", user: { _id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ================= LOGOUT ================= */
app.get("/api/user/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "User logged out successfully" });
});

/* ================= PROTECTED ================= */
app.get("/api/user/profile", authuser, (req, res) => {
  res.json({ success: true, user: req.user });
});

app.get("/api/user/is-auth", authuser, (req, res) => {
  res.json({ success: true, user: req.user });
});

// index.js mein ise update kar
app.use("/images", express.static("uploads/images"));
/* ================= ROUTES ================= */
app.use("/api/user", useRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productroutes);
app.use("/api/cart", cartroutes);
app.use("/api/order", orderRoute);
app.use("/api/address", addressRoute);

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
