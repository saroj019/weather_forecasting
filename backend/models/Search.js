import mongoose from "mongoose";

const searchSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true
    },
    temperature: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Search", searchSchema);
