import Ticket from "../models/Ticket.js";

export const checkSlaBreaches = async () => {
  const now = new Date();

  const tickets = await Ticket.find({
    status: { $ne: "Resolved" },
    slaDeadline: { $lt: now },
  });

  for (let ticket of tickets) {
    if (ticket.escalationLevel === 0) {
      ticket.escalationLevel = 1;
      ticket.escalated = true;
      console.log(`Ticket ${ticket._id} escalated to Level 1`);
    } 
    else if (ticket.escalationLevel === 1) {
      ticket.escalationLevel = 2;
      console.log(`Ticket ${ticket._id} escalated to Level 2`);
    }

    await ticket.save();
  }

  console.log("Advanced SLA Check Completed");
};
