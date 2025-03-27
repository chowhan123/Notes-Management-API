import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true, 
      trim: true },
    description: {
      type: String,
      required: true, 
      trim: true },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model("Note", noteSchema);
