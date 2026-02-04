import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http"; // Import http
import { initSocket } from "./socket.js";
import connectDB from "./config/db.js";
import slaRoutes from "./routes/slaRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import startSLAMonitor from "./jobs/slaMonitor.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

initSocket(server);

app.use(cors());
app.use(express.json());

app.use("/api/sla", slaRoutes);
app.use("/api/tickets", ticketRoutes);

startSLAMonitor();

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
