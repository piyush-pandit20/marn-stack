// routes/order.routes.js
import express from "express";
import { authuser } from "../middlewares/authUser.js";
import { addAddress, getAddress } from "../controllers/address.controller.js";

const router = express.Router();

// ✅ Address Save karne ke liye: /api/address/add
router.post("/add", authuser, addAddress);

// ✅ Address Fetch karne ke liye: /api/address/get (Pehle yahan "/add" tha, isliye 404 aa raha tha)
router.get("/get", authuser, getAddress); 

export default router;