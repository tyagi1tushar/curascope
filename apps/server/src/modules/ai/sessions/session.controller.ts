import { NextFunction, Request, Response } from "express";
import { SessionService } from "./session.service";
import { createSessionSchema } from "./session.validation";
import { SessionQuery } from "./session.query";

export class SessionController {
    static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const body = createSessionSchema.parse(req.body);

            const session = await SessionService.createSession({
                request: {
                    prompt: body.prompt,
                    provider: body.provider,
                    model: body.model,
                },
            });

            return res.status(201).json(session);
        } catch (error) {
            next(error);
        }
    }

    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const query: SessionQuery = {
                page: req.query.page
                    ? Number(req.query.page)
                    : undefined,

                limit: req.query.limit
                    ? Number(req.query.limit)
                    : undefined,

                provider: req.query.provider as SessionQuery["provider"],

                status: req.query.status as SessionQuery["status"],

                risk: req.query.risk as SessionQuery["risk"],

                search: req.query.search as string,

                sort: req.query.sort as string,
            };
            
            const sessions = await SessionService.getAllSessions(query);

            return res.json(sessions);
        } catch (error) {
            next(error);
        }
    }

    static async getById(
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const session = await SessionService.getSessionById(req.params.id);

            if (!session) {
                return res.status(404).json({
                    success: false,
                    message: "Session not found",
                });
            }

            return res.json(session);
        } catch (error) {
            next(error);
        }
    }

}