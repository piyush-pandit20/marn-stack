// import Order from "../models/order.model.js";
// //place order cod :/api/order/cod
// export const placeOrderCOD=async(req,res)=>{
//     try {
//         const userId=req.user;
//         const{items,address}=req.body;
//         if(!items || !address){
//             return res.status(400).json({message:"Items and address are require",success:false});
//         }
//         let amount =await items.reduce(async(ActiveXObject, item)=>{
//             const product=await product.findById(item.product);
//             return(await acc )+product.offerPrice*item.quantity;
//         },0)

//         // add text charef2 %
//         amount+=Math.floor((amount*2)/100)
//         await Order.create({
//                 userId,
//                 items,
//                 address,
//                 amount,
//                 status:"placed",
//                 paymentType:"COD",
//                 isPaid:false,
//         });
//         res.status(2001).json({
//             message:"Order place successfully",
//             success:true,
//         })
//     } catch (error) {
//         console.error("Error placing order:",error);
//             res.status(500).json({message:"internal server error"});
        
//     }
// }

// // order details for indivisual user :/api/order/user
// export const getUserOrders=async(req,res)=>{
//     try {
//         const userId=req.user;
//         const orders=await Order.find ({
//             userId,
//             $or:[{paymentMethod:"COD"},{isPaid:true}],
//         }) .populate("items.product address").sort({createdAt:-1})
//         res.status(200).json({
//             success:true,
//             orders,
//         })
        
        
//     } catch (error) {
//         console.error("Error fatching user order:",error);
//             res.status(500).json({message:"internal server error"});
//     }
// };
// // get all ordersfor admin :/api/orders/seller
// export const getAllOrders=async(req,res)=>{
//     try {
//         const orders=await Order.find({
//             $or:[{paymentMethod:"COD"},{isPaid:true}]
//         }).populate("items.product address").sort({createdAt:-1});
//         res.status(200).json({
//             success:true,
//             orders,
//         })
//     } catch (error) {
//         console.error("Error fetching all order:",error);
//             res.status(500).json({message:"internal server error"});
//     }
// }
import Order from "../models/order.model.js";
import Product from "../models/product.model.js"; 

//place order cod :/api/order/cod
export const placeOrderCOD=async(req,res)=>{
    try {
        const userId=req.user;
        const{items,address}=req.body;
        if(!items || !address){
            return res.status(400).json({message:"Items and address are require",success:false});
        }

        // FIX: reduce async mein crash karta hai, for loop se amount nikala hai
        let amount = 0;
        for (const item of items) {
            const productData = await Product.findById(item.product);
            if (productData) {
                amount += productData.offerPrice * item.quantity;
            }
        }

        // add text charef2 %
        amount+=Math.floor((amount*2)/100)

        await Order.create({
                userId,
                items,
                address,
                amount,
                status:"placed",
                paymentType:"COD", // FIX: Error yahi tha, Model ko yahi chahiye
                isPaid:false,
        });

        res.status(201).json({ // FIX: 201 is correct
            message:"Order place successfully",
            success:true,
        })
    } catch (error) {
        console.error("Error placing order:",error);
        res.status(500).json({message: error.message});
    }
}

// order details for indivisual user :/api/order/user
export const getUserOrders=async(req,res)=>{
    try {
        const userId=req.user;
        const orders=await Order.find ({
            userId,
            $or:[{paymentType:"COD"},{isPaid:true}], // FIX: paymentMethod ko paymentType kiya
        }) .populate("items.product address").sort({createdAt:-1})
        res.status(200).json({
            success:true,
            orders,
        })
    } catch (error) {
        console.error("Error fatching user order:",error);
        res.status(500).json({message:"internal server error"});
    }
};

// get all ordersfor admin :/api/orders/seller
export const getAllOrders=async(req,res)=>{
    try {
        const orders=await Order.find({
            $or:[{paymentType:"COD"},{isPaid:true}] // FIX: paymentMethod ko paymentType kiya
        }).populate("items.product address").sort({createdAt:-1});
        res.status(200).json({
            success:true,
            orders,
        })
    } catch (error) {
        console.error("Error fetching all order:",error);
        res.status(500).json({message:"internal server error"});
    }
}