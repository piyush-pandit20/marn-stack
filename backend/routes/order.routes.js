// routes/order.routes.js
import express from "express";
import { authuser } from "../middlewares/authUser.js";
import { getAllOrders, getUserOrders, placeOrderCOD } from "../controllers/order.controller.js";
import { authSeller } from "../middlewares/authSeller.js";

const router = express.Router();

router.post("/cod", authuser, placeOrderCOD);
router.get("/user", authuser, getUserOrders);
router.get("/seller", authSeller, getAllOrders);

export default router; // ✅ default export kaise sahi karte hain
