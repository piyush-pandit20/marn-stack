// // routes/user.routes.js

// import express from "express";

// import { authSeller } from "../middlewares/authSeller.js";
// import { upload } from "../config/multer.js";
// import { addProduct, changeStock, getProductById, getProducts } from "../controllers/Product.controller.js";

// const router = express.Router();

// router.post("/add-product", authSeller, upload.array("image"), addProduct);
// router.get("/list", getProducts);
// router.get("/id", getProductById);
// router.post("/stock", authSeller, changeStock); // ✅ Slash corrected

// export default router;
// routes/productroutes.js

import express from "express";
import { authSeller } from "../middlewares/authSeller.js";
import { upload } from "../config/multer.js";
import { addProduct, changeStock, getProductById, getProducts } from "../controllers/Product.controller.js";

const router = express.Router();

router.post("/add-product", authSeller, upload.array("image"), addProduct);
router.get("/list", getProducts);
router.get("/id", getProductById);

// ✅ Iska full path banega: http://localhost:5000/api/product/stock
router.post("/stock", authSeller, changeStock); 

export default router;