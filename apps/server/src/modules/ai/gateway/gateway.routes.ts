import { Router } from "express";

import { GatewayController } from "./gateway.controller";

const router = Router();

router.post("/", GatewayController.chat);

export default router;