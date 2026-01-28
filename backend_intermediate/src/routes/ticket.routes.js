import express from "express";
import { 
  createTicket, 
  getTickets,
  resolveTicket 
} from "../controllers/ticket.controller.js";

const router = express.Router();

router.post("/", createTicket);
router.get("/", getTickets);
router.patch("/:id/resolve", resolveTicket);

export default router;
