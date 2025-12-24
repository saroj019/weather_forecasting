import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log("✅ MongoDB connected");
    return true;
  } catch {
    console.warn("⚠️ MongoDB not connected, continuing without DB");
    return false;
  }
};

export default connectDB;
