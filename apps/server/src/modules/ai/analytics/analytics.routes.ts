import { Router } from "express";
import { getOverview } from "./analytics.controller";

const router = Router();

/**
 * Dashboard analytics endpoints.
 */
router.get("/overview", getOverview);

export default router;