import { Router } from "express";

import { DashboardController } from "./dashboard.controller";

const router = Router();

router.get("/summary", DashboardController.summary);
router.get("/analytics", DashboardController.analytics);
router.get("/sessions", DashboardController.getSessions);
router.get("/sessions/:id", DashboardController.getSessionDetails);

export default router;