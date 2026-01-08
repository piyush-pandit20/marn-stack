import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB connected successfully.`);
    } catch (error) {
        console.error(`❌ MongoDB connection error: ${error.message}`);
        // If connection fails, the process must exit, otherwise Mongoose will try to save data to a non-existent database.
        process.exit(1); 
    }
};