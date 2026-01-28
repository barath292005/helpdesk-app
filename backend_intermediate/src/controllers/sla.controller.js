import asyncHandler from "../utils/asyncHandler.js";
import {
  createSLAService,
  getAllSLAs,
  updateSLAService,
  deleteSLAService,
} from "../services/sla.service.js";

export const createSLA = asyncHandler(async (req, res) => {
  const sla = await createSLAService(req.body);
  res.status(201).json(sla);
});

export const getSLAs = asyncHandler(async (req, res) => {
  const slas = await getAllSLAs();
  res.json(slas);
});

export const updateSLA = asyncHandler(async (req, res) => {
  const sla = await updateSLAService(req.params.id, req.body);
  res.json(sla);
});

export const deleteSLA = asyncHandler(async (req, res) => {
  const result = await deleteSLAService(req.params.id);
  res.json(result);
});
