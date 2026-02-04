import api from "../api";

export const fetchTickets = async () => {
  const res = await api.get("/tickets");
  return res.data;
};

export const createTicket = async (ticketData) => {
  const res = await api.post("/tickets", ticketData);
  return res.data;
};

export const acknowledgeEscalation = async (ticketId) => {
  const res = await api.patch(`/tickets/${ticketId}/acknowledge`);
  return res.data;
};
