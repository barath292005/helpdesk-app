import Ticket from "../models/Ticket.js";
import { calculateDeadlines } from "../services/slaService.js";

export const createTicket = async (req, res) => {
  try {
    const { subject, description, priority } = req.body;

    const createdAt = new Date();
    let responseDeadline, resolutionDeadline;

    try {
      const deadlines = await calculateDeadlines(priority, createdAt);
      responseDeadline = deadlines.responseDeadline;
      resolutionDeadline = deadlines.resolutionDeadline;
    } catch (err) {
      return res.status(400).json({ message: "SLA Configuration not found for this priority. Please ask Admin to configure SLA first." });
    }

    const ticket = await Ticket.create({
      subject,
      description,
      priority,
      responseDeadline,
      resolutionDeadline
    });

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const acknowledgeEscalation = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.escalationAcknowledged = true;
    ticket.history.push({
      action: 'Acknowledged',
      message: `Escalation acknowledged by Manager`,
      role: 'Manager' // In real app, get from req.user
    });

    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTickets = async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
};
