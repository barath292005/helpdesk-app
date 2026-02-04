import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    subject: String,
    description: String,
    priority: String,
    status: {
      type: String,
      default: "Open"
    },
    responseDeadline: Date,
    resolutionDeadline: Date,
    breached: { type: Boolean, default: false },
    escalated: { type: Boolean, default: false },
    escalationLevel: { type: Number, default: 0 }, // 0: None, 1: Admin, 2: Manager
    escalatedTo: { type: String, default: null }, // Role name
    escalationAcknowledged: { type: Boolean, default: false },
    history: [{
      action: String, // e.g., 'Escalated', 'Acknowledged', 'Breached'
      message: String,
      role: String,
      timestamp: { type: Date, default: Date.now }
    }]
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
