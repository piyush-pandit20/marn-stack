import User from "../models/user.model.js"

// Update user cartItems: /api/cart/update
export const updateCart = async (req, res) => {
    try {
        const userId = req.user._id; 
        
        // 🚨 FIX 1: Frontend se 'cartItems' aa raha hai, iska naam wahi rakho
        const { cartItems } = req.body; 

        // 🚨 FIX 2: '$set' use karo taaki Mongoose ko pata chale ki object change hua hai
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { cartItems: cartItems } }, 
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Cart updated successfully ✅",
            cartItems: updatedUser.cartItems 
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}