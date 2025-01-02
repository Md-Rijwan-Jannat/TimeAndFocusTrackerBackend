import { Request, Response } from "express";
import { FocusMetricsService } from "./focusMetrics.service";

const getFocusMetrics = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { type } = req.query; // `type` can be "daily" or "weekly"

  try {
    const metrics = await FocusMetricsService.getFocusMetrics(
      userId,
      type as string
    );
    res
      .status(200)
      .json({ message: "Focus metrics retrieved successfully", metrics });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getStreaks = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const streaks = await FocusMetricsService.getStreaks(userId);
    res
      .status(200)
      .json({ message: "Streaks retrieved successfully", streaks });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const focusMetricsController = {
  getFocusMetrics,
  getStreaks,
};
