import mongoose from "mongoose";

const searchSchema = new mongoose.Schema(
  { city: String },
  { timestamps: true }
);

export default mongoose.model("Search", searchSchema);
