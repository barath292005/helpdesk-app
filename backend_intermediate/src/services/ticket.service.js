import Ticket from "../models/Ticket.js";
import { getSLAByPriority } from "./sla.service.js";

export const createTicketService = async (data) => {
  const sla = await getSLAByPriority(data.priority);

  let deadline = null;
  if (sla) {
    deadline = new Date(Date.now() + sla.resolutionTime * 60000);
  }

  return Ticket.create({
    ...data,
    slaDeadline: deadline
  });
};

export const getOpenTickets = () => {
  return Ticket.find({ status: "Open" });
};
export const resolveTicketService = async (id) => {
  const ticket = await Ticket.findById(id);
  if (!ticket) throw new Error("Ticket not found");

  ticket.status = "Resolved";
  await ticket.save();

  return ticket;
};
