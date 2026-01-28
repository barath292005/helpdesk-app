import express from "express";
import {
  createSLA,
  getSLAs,
  updateSLA,
  deleteSLA,
} from "../controllers/sla.controller.js";

const router = express.Router();

router.post("/", createSLA);
router.get("/", getSLAs);
router.patch("/:id", updateSLA);
router.delete("/:id", deleteSLA);

export default router;
