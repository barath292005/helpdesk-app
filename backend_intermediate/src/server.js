
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import slaRoutes from "./routes/sla.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import notFound from "./middleware/notFound.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";
import "./cron/sla.cron.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB(process.env.MONGO_URI);

app.use("/api/sla", slaRoutes);
app.use("/api/tickets", ticketRoutes);

app.use(notFound);
app.use(errorMiddleware);

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);
