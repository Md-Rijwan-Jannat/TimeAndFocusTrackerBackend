import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { focusMetricService } from "./analytics.service";

// Controller to get daily metrics
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

// Controller to get weekly metrics
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

// Controller to get monthly metrics
const getMonthlyMetrics = catchAsync(async (req, res) => {
  const { id } = req.user;
  const metrics = await focusMetricService.calculateMonthlyMetrics(Number(id));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Monthly metrics retrieved",
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

export const FocusMetricController = {
  getDailyMetrics,
  getWeeklyMetrics,
  getMonthlyMetrics,
  getStreakMetrics,
};
