import SLA from "../models/SLA.js";

export const calculateDeadlines = async (priority, createdAt) => {
  const sla = await SLA.findOne({ priority });

  if (!sla) throw new Error("SLA not found");

  const responseDeadline = new Date(
    createdAt.getTime() + sla.responseTime * 60000
  );

  const resolutionDeadline = new Date(
    createdAt.getTime() + sla.resolutionTime * 60000
  );

  return { responseDeadline, resolutionDeadline };
};
