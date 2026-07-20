import { Router } from "express";
import { SessionController } from "./session.controller";

const router = Router();

router.post("/", SessionController.create);

router.get("/", SessionController.getAll);

router.get("/:id", SessionController.getById);

export default router;