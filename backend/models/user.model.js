import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
    },
    password: {
      type: String,
      required: true,
    },
    cartItems: {
      type: Object,
      default: {},
    },
  },
  // minimize: false se empty objects (cart) database mein save honge
  { minimize: false, timestamps: true }
);

// 🚨 Yahan fix hai: Pehle check karo model pehle se bana toh nahi hai
const User = mongoose.models.User || mongoose.model("User", userSchema); 

export default User;