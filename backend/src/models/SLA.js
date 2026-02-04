import mongoose from "mongoose";

const slaSchema = new mongoose.Schema(
  {
    priority: { type: String, required: true, unique: true },
    responseTime: { type: Number, required: true }, // in minutes
    resolutionTime: { type: Number, required: true } // in minutes
  },
  { timestamps: true }
);

export default mongoose.model("SLA", slaSchema);
