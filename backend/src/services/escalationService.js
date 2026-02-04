import { getIO } from "../socket.js";

export const escalateTicket = async (ticket) => {
  let targetRole = "Admin";
  let level = 1;

  // Higher priority goes straight to Manager
  if (ticket.priority === 'High' || ticket.priority === 'Critical') {
    targetRole = "Manager";
    level = 2;
  }

  ticket.escalated = true;
  ticket.escalationLevel = level;
  ticket.escalatedTo = targetRole;

  // Add to History Log
  ticket.history.push({
    action: 'Escalated',
    message: `System escalated ticket to ${targetRole} due to ${ticket.priority} priority breach.`,
    role: 'System'
  });

  await ticket.save();

  console.log(
    `🚨 Escalation Triggered → Notifying ${targetRole} for Ticket: ${ticket.subject}`
  );

  const io = getIO();
  io.emit("ticket_escalated", {
    message: `Ticket ${ticket.subject} has been escalated to ${targetRole}!`,
    ticket
  });

  // Also emit generic update so the card refreshes
  io.emit("ticket_updated", ticket);
};
