import express from "express";
import { updateCart } from "../controllers/cart.controller.js";
import { authuser } from "../middlewares/authuser.js"; // correct path

const router = express.Router();

router.post("/update", authuser, updateCart);

export default router;
