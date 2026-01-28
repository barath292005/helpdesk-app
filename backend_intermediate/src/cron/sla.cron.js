import cron from "node-cron";
import { checkSlaBreaches } from "../services/escalation.service.js";

cron.schedule("*/1 * * * *", () => {
  checkSlaBreaches();
});
