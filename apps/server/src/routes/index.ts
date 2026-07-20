import { Router } from "express";
import { healthRoutes } from "../modules/health";
import { sessionRoutes } from "../modules/ai/sessions";
import { analyticsRoutes } from "../modules/ai/analytics";

const router = Router();

router.use("/health", healthRoutes);
router.use("/ai/sessions", sessionRoutes);
router.use("/ai/analytics", analyticsRoutes);

export default router;