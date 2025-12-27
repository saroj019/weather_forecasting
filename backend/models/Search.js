import mongoose from "mongoose";

const searchSchema = new mongoose.Schema(
  {
    city: String,
    temperature: Number,
    aqi: Number
  },
  { timestamps: true }
);

export default mongoose.model("Search", searchSchema);
