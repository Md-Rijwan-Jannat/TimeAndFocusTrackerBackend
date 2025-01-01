import { Request, Response } from "express";
import { FocusMetricService } from "./focusMetrice.service";

// Get focus metrics for a user
const getFocusMetrics = async (req: Request, res: Response) => {
  const { user_id, start_date, end_date } = req.query;
  try {
    const metrics = await FocusMetricService.getFocusMetrics(
      parseInt(user_id as string),
      start_date as string,
      end_date as string
    );
    res.status(200).json({ metrics });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get streak data for a user
const getStreaks = async (req: Request, res: Response) => {
  const { user_id } = req.query;
  try {
    const streaks = await FocusMetricService.getStreaks(
      parseInt(user_id as string)
    );
    res.status(200).json({ streaks });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const focusMetricsController = {
  getFocusMetrics,
  getStreaks,
};
