import { Router } from "express";

import { analyticsRoutes } from "../modules/ai/analytics";
import { gatewayRouter } from "../modules/ai/gateway";
import { sessionRoutes } from "../modules/ai/sessions";
import { healthRoutes } from "../modules/health";

const router = Router();

router.use("/health", healthRoutes);
router.use("/ai/chat", gatewayRouter);
router.use("/ai/sessions", sessionRoutes);
router.use("/ai/analytics", analyticsRoutes);

export default router;