import { Request, Response } from "express";

import { DashboardService } from "./dashboard.service";

export class DashboardController {

    static async summary(
        req: Request,
        res: Response
    ) {
        const summary =
            await DashboardService.getSummary();

        res.json(summary);
    }

    static async getSessions(req: Request, res: Response) {
        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 10);

        const data = await DashboardService.getSessions(page, limit);

        res.json({
            success: true,
            data,
        });
    }

    static async getSessionDetails(
        req: Request,
        res: Response
    ) {
        const id = String(req.params.id);

        const session =
            await DashboardService.getSessionDetails(id);

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found",
            });
        }

        return res.json({
            success: true,
            data: session,
        });
    }

    static async analytics(
        req: Request,
        res: Response
    ) {
        const analytics =
            await DashboardService.getAnalytics();

        return res.json({
            success: true,
            data: analytics,
        });
    }

}