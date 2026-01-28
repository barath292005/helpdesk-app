import SLA from "../models/SLA.js";

export const createSLAService = (data) => {
  return SLA.create(data);
};

export const getAllSLAs = () => {
  return SLA.find();
};

// 🔥 ADD THIS BACK
export const getSLAByPriority = (priority) => {
  return SLA.findOne({ priority });
};

export const updateSLAService = async (id, data) => {
  const sla = await SLA.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!sla) {
    throw new Error("SLA not found");
  }

  return sla;
};

export const deleteSLAService = async (id) => {
  const sla = await SLA.findByIdAndDelete(id);

  if (!sla) {
    throw new Error("SLA not found");
  }

  return { message: "SLA deleted successfully" };
};
