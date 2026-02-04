import express from "express";
import { createTicket, getTickets, acknowledgeEscalation } from "../controllers/ticketController.js";

const router = express.Router();

router.post("/", createTicket);
router.get("/", getTickets);
router.patch("/:id/acknowledge", acknowledgeEscalation);

export default router;
