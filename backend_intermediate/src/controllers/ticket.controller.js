import asyncHandler from "../utils/asyncHandler.js";
import { 
  createTicketService, 
  getOpenTickets,
  resolveTicketService 
} from "../services/ticket.service.js";

export const createTicket = asyncHandler(async (req, res) => {
  const ticket = await createTicketService(req.body);
  res.status(201).json(ticket);
});

export const getTickets = asyncHandler(async (req, res) => {
  const tickets = await getOpenTickets();
  res.json(tickets);
});

export const resolveTicket = asyncHandler(async (req, res) => {
  const ticket = await resolveTicketService(req.params.id);
  res.json(ticket);
});
