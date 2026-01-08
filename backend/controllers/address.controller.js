import Address from '../models/address.model.js'

// add address: /api/address/add
export const addAddress = async (req, res) => {
    try {
        // ✅ 1. Auth check
        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: "Login required" });
        }

        const userId = req.user._id; 
        
        // ✅ FIX: 'pincode' ki jagah 'zipCode' use kiya (Kyuki model wahi mang raha hai)
        const { firstName, lastName, street, city, state, zipCode, country, phone, email } = req.body;

        // ✅ 2. Duplicate Check
        const existing = await Address.findOne({ userId, street, city, zipCode });
        if (existing) {
            return res.status(400).json({ success: false, message: "Address already saved" });
        }

        // ✅ 3. Create with correct key: zipCode
        const newAddress = await Address.create({
            firstName, 
            lastName, 
            street, 
            city, 
            state, 
            zipCode, // 👈 Model validation ab pass ho jayega
            country, 
            phone, 
            email,
            userId
        });

        res.status(201).json({
            success: true,
            message: "Address Added Successfully",
            address: newAddress
        });

    } catch (error) {
        console.error("ADD_ADDRESS_ERROR:", error.message);
        res.status(500).json({ success: false, message: "Server Error: " + error.message });
    }
}

// get address: /api/address/get
export const getAddress = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: "Login required" });
        }

        const userId = req.user._id;
        
        // ✅ 4. Latest address sabse upar
        const addresses = await Address.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            addresses,
        });

    } catch (error) {
        console.error("GET_ADDRESS_ERROR:", error.message);
        res.status(500).json({ success: false, message: "Server Error: " + error.message });
    }
}