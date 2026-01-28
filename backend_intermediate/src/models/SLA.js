import mongoose from "mongoose";

const slaSchema = new mongoose.Schema({
  priority: { type: String, required: true, unique: true },
  responseTime: Number,
  resolutionTime: Number
});

export default mongoose.model("SLA", slaSchema);
