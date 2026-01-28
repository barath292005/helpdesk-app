import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: String, required: true },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Resolved", "Closed"],
    default: "Open",
  },
  createdAt: { type: Date, default: Date.now },
  slaDeadline: Date,
  escalated: { type: Boolean, default: false },
  escalationLevel: { type: Number, default: 0 }, // 0 = none, 1 = L1, 2 = L2
});

export default mongoose.model("Ticket", ticketSchema);
