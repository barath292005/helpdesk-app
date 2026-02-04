import mongoose from "mongoose";
import dotenv from "dotenv";
import Ticket from "./models/Ticket.js";
import SLA from "./models/SLA.js";

dotenv.config();

const createTestTickets = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        // Ensure we have SLAs (Mocking them if missing, but usually SLAManagement page handles this)
        // We will just force specific deadlines for testing purposes
        const now = new Date();
        const oneMinuteAgo = new Date(now.getTime() - 60000); // Created 1 min ago
        const breachTime = new Date(now.getTime() - 1000); // Deadline passed 1 sec ago

        const highTicket = new Ticket({
            subject: "Critical Server Failure (Test)",
            description: "This is a test ticket to verify Manager Escalation.",
            priority: "High",
            status: "Open",
            responseDeadline: breachTime,
            resolutionDeadline: breachTime,
            createdAt: oneMinuteAgo
        });

        const lowTicket = new Ticket({
            subject: "Mouse not working (Test)",
            description: "This is a test ticket to verify Admin Escalation.",
            priority: "Low",
            status: "Open",
            responseDeadline: breachTime,
            resolutionDeadline: breachTime,
            createdAt: oneMinuteAgo
        });

        await highTicket.save();
        await lowTicket.save();

        console.log("✅ Created 'High' Priority Ticket (Target: Manager)");
        console.log("✅ Created 'Low' Priority Ticket (Target: Admin)");
        console.log("Tickets should be breached immediately. Watch the console/UI for escalation events.");

        process.exit();
    } catch (error) {
        console.error("Error creating tickets:", error);
        process.exit(1);
    }
};

createTestTickets();
