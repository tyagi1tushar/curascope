import { NextFunction, Request, Response } from "express";

import { GatewayService } from "./gateway.service";

export class GatewayController {
  static async chat(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await GatewayService.chat(req.body);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}