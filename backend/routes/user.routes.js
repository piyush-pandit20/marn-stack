// routes/user.routes.js

import express from "express";
import { loginUser, registerUser ,logoutUser, isAuthUser} from "../controllers/user.controller.js";
import { authuser } from "../middlewares/authUser.js"; // ⬅️ यह मिडलवेयर

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", authuser, logoutUser); 
router.get("/is-auth", authuser, isAuthUser);    


export default router;