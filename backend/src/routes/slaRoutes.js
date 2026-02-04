import express from "express";
import { createSLA, getSLAs } from "../controllers/slaController.js";

const router = express.Router();

router.post("/", createSLA);
router.get("/", getSLAs);

export default router;
