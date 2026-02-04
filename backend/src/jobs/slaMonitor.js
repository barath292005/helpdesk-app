import cron from "node-cron";
import Ticket from "../models/Ticket.js";
import { escalateTicket } from "../services/escalationService.js";
import { getIO } from "../socket.js";

const startSLAMonitor = () => {
  cron.schedule("* * * * *", async () => {
    const now = new Date();
    const io = getIO(); // Get socket instance

    // Check for Resolution Breaches
    const resolutionBreachedTickets = await Ticket.find({
      resolutionDeadline: { $lt: now },
      breached: false,
      status: { $nin: ["Resolved", "Waiting for Customer"] } // Don't escalate if waiting
    });

    for (let ticket of resolutionBreachedTickets) {
      ticket.breached = true;
      await ticket.save();
      await escalateTicket(ticket);

      io.emit("ticket_updated", ticket); // Notify frontend
    }

    // Check for Response Breaches (new logic)
    // Assuming status stays 'Open' if no response. Adjust logic if 'In Progress' means responded.
    const responseBreachedTickets = await Ticket.find({
      responseDeadline: { $lt: now },
      status: "Open", // Still open means no response yet
      breached: false // prevent double marking if only tracking one breach flag. 
      // ideally we might want separate flags for responseBreached vs resolutionBreached
    });

    // For simplicity, we might just mark them escalated or notified, 
    // but the current schema only has one 'breached' flag. 
    // Let's just escalate them too.
    for (let ticket of responseBreachedTickets) {
      // If we want to distinguish, we should add more fields, but for this PRD scope:
      if (!ticket.breached) {
        ticket.breached = true;
        await ticket.save();
        await escalateTicket(ticket);
        io.emit("ticket_updated", ticket);
      }
    }

  });
};

export default startSLAMonitor;
