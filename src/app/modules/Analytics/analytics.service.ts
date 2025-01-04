import prisma from "../../config/prismaClient";
import AppError from "../../error/appError";
import httpStatus from "http-status";
import { getStartEndOfWeek } from "./analytics.utils";

// Calculate daily metrics for a specific date
const calculateDailyMetrics = async (userId: number, date: Date) => {
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  const sessions = await prisma.focusSession.findMany({
    where: {
      userId: userId,
      startedAt: { gte: startOfDay, lte: endOfDay },
    },
  });

  const totalFocusTime = sessions.reduce(
    (sum, session) => sum + session.focusDuration,
    0
  );
  const sessionsCompleted = sessions.length;

  // Prepare data for Recharts (Daily format)
  const dayData = [
    { name: "Mon", total: 0 },
    { name: "Tue", total: 0 },
    { name: "Wed", total: 0 },
    { name: "Thu", total: 0 },
    { name: "Fri", total: 0 },
    { name: "Sat", total: 0 },
    { name: "Sun", total: 0 },
  ];

  const dayIndex = startOfDay.getDay();
  dayData[dayIndex].total = totalFocusTime;

  return { dayData, totalFocusTime, sessionsCompleted };
};

// Calculate weekly metrics for the last 7 days
const calculateWeeklyMetrics = async (userId: number) => {
  const now = new Date();
  const { startOfWeek, endOfWeek } = getStartEndOfWeek(now);

  const sessions = await prisma.focusSession.findMany({
    where: {
      userId: userId,
      startedAt: { gte: startOfWeek, lte: endOfWeek },
    },
  });

  // Aggregate data weekly
  const weeklyData = [
    { name: "Week 1", total: 0 },
    { name: "Week 2", total: 0 },
    { name: "Week 3", total: 0 },
    { name: "Week 4", total: 0 },
  ];

  const totalFocusTime = sessions.reduce(
    (sum, session) => sum + session.focusDuration,
    0
  );
  const sessionsCompleted = sessions.length;

  // Prepare weekly data (this assumes data split into 4 weeks in the month)
  // In production, you may want to group by actual weeks dynamically
  const currentWeekIndex = Math.floor(Math.random() * 4); // Example logic for demonstration
  weeklyData[currentWeekIndex].total = totalFocusTime;

  return { weeklyData, totalFocusTime, sessionsCompleted };
};

// Calculate monthly metrics (example: summarize by week)
const calculateMonthlyMetrics = async (userId: number, month: Date) => {
  const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

  const sessions = await prisma.focusSession.findMany({
    where: {
      userId: userId,
      startedAt: { gte: startOfMonth, lte: endOfMonth },
    },
  });

  // Aggregating data monthly (splitting the data across weeks)
  const monthlyData = [
    { name: "Week 1", total: 0 },
    { name: "Week 2", total: 0 },
    { name: "Week 3", total: 0 },
    { name: "Week 4", total: 0 },
  ];

  const totalFocusTime = sessions.reduce(
    (sum, session) => sum + session.focusDuration,
    0
  );

  // Split into weeks (simplified here; production logic should be more robust)
  const currentWeekIndex = Math.floor(Math.random() * 4); // Example logic for demonstration
  monthlyData[currentWeekIndex].total = totalFocusTime;

  return { monthlyData, totalFocusTime };
};

// Calculate streaks (current streak and longest streak)
const calculateStreaks = async (userId: number) => {
  const sessions = await prisma.focusSession.findMany({
    where: { userId: userId },
    orderBy: { startedAt: "asc" },
  });

  let currentStreak = 0;
  let longestStreak = 0;
  let lastDate: string | null = null;

  sessions.forEach((session) => {
    const sessionDate = session.startedAt.toISOString().split("T")[0];
    if (
      lastDate &&
      new Date(sessionDate).getTime() - new Date(lastDate).getTime() ===
        86400000
    ) {
      currentStreak += 1;
    } else {
      currentStreak = 1;
    }
    longestStreak = Math.max(longestStreak, currentStreak);
    lastDate = sessionDate;
  });

  return { currentStreak, longestStreak };
};

export const focusMetricService = {
  calculateDailyMetrics,
  calculateWeeklyMetrics,
  calculateMonthlyMetrics,
  calculateStreaks,
};
