import api from "../api";

export const getSLAs = async () => {
  const res = await api.get("/sla");
  return res.data;
};

export const createSLA = async (data) => {
  const res = await api.post("/sla", data);
  return res.data;
};
