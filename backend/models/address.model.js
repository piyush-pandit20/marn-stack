import mongoose from "mongoose"

const addressSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    firstName: { type: String, required: true }, // ✅ Fix: Capital 'N'
    lastName: { type: String, required: true },  // ✅ Fix: Capital 'N'
    email: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },   // ✅ Fix: 'zipCode' not 'ziocode'
    country: { type: String, required: true },
    phone: { type: String, required: true },
}, { timestamps: true }); // Timestamps se data manage karna asaan hoga

const address = mongoose.models.address || mongoose.model("address", addressSchema);
export default address;