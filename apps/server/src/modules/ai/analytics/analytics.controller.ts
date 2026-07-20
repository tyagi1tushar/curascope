import { Request, Response, NextFunction } from "express";
import { AnalyticsService } from "./analytics.service";

/**
 * Returns high-level analytics used by the CuraScope dashboard.
 */
export const getOverview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const overview = await AnalyticsService.getOverview();

    res.status(200).json({
      success: true,
      data: overview,
    });
  } catch (error) {
    next(error);
  }
};