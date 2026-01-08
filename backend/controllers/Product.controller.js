import Product from "../models/product.model.js";

// ===============================
// Add Product : POST /api/product/add-product
// ===============================
export const addProduct = async (req, res) => {
    try {
        const { name, description, price, offerPrice, category } = req.body;

        // images array
        const image = req.files?.map((file) => file.filename);

        if (
            !name ||
            !price ||
            !offerPrice ||
            !description ||
            !category ||
            !image ||
            image.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields including images are required",
            });
        }

        const newProduct = await Product.create({
            name,
            description,
            price,
            offerPrice,
            category,
            image,
        });

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: newProduct,
        });

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// ===============================
// Get All Products : GET /api/product/list
// ===============================
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            products,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// ===============================
// Get Single Product : GET /api/product?id=
// ===============================
export const getProductById = async (req, res) => {
    try {
        const { id } = req.query;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            product,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// ==========================================
// ✅ Change Stock (UPDATED FOR TOGGLE)
// POST /api/product/stock
// ==========================================
export const changeStock = async (req, res) => {
    try {
        const { id } = req.body; 

        // 1. Find product
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found", // ✅ Changed to English
            });
        }

        // 2. Toggle status
        product.inStock = !product.inStock;
        
        // 3. Save
        await product.save();

        res.status(200).json({
            success: true,
            // ✅ Message changed to English
            message: `Product is now ${product.inStock ? "In Stock" : "Out of Stock"}`,
            inStock: product.inStock,
        });

    } catch (error) {
        console.error("Stock update error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};  