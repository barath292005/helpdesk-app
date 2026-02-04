import SLA from "../models/SLA.js";

export const createSLA = async (req, res) => {
  const { priority, responseTime, resolutionTime } = req.body;

  const sla = await SLA.create({
    priority,
    responseTime,
    resolutionTime
  });

  res.json(sla);
};

export const getSLAs = async (req, res) => {
  const slas = await SLA.find();
  res.json(slas);
};
