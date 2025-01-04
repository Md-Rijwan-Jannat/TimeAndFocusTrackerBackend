import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { focusMetricService } from "./analytics.service";

const getDailyMetrics = catchAsync(async (req, res) => {
  const { id } = req.user;
  const dateParam = req.query.date;
  const date = new Date(dateParam ? String(dateParam) : new Date());
  const metrics = await focusMetricService.calculateDailyMetrics(
    Number(id),
    date
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Daily metrics retrieved",
    data: metrics,
  });
});

const getWeeklyMetrics = catchAsync(async (req, res) => {
  const { id } = req.user;
  const metrics = await focusMetricService.calculateWeeklyMetrics(Number(id));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Weekly metrics retrieved",
    data: metrics,
  });
});

const getStreakMetrics = catchAsync(async (req, res) => {
  const { id } = req.user;
  const streaks = await focusMetricService.calculateStreaks(Number(id));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Streak metrics retrieved",
    data: streaks,
  });
});

export const focusMetricController = {
  getDailyMetrics,
  getWeeklyMetrics,
  getStreakMetrics,
};
