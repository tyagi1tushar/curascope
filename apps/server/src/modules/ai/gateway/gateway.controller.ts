import { NextFunction, Request, Response } from "express";

import { GatewayService } from "./gateway.service";
import { gatewayRequestSchema } from "./gateway.validation";

export class GatewayController {
    static async chat(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const request = gatewayRequestSchema.parse(req.body);

            const result = await GatewayService.chat(request);

            res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }
}