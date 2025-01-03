import prisma from "../../config/prismaClient";
import AppError from "../../error/appError";
import httpStatus from "http-status";

const calculateDailyMetrics = async (userId: number, date: Date) => {
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  const sessions = await prisma.focusSession.findMany({
    where: {
      user_id: userId,
      start_time: { gte: startOfDay, lte: endOfDay },
    },
  });

  const totalFocusTime = sessions.reduce(
    (sum, session) => sum + session.duration,
    0
  );
  const sessionsCompleted = sessions.length;

  return { totalFocusTime, sessionsCompleted };
};

const calculateWeeklyMetrics = async (userId: number) => {
  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const sessions = await prisma.focusSession.findMany({
    where: {
      user_id: userId,
      start_time: { gte: weekAgo, lte: now },
    },
  });

  const totalFocusTime = sessions.reduce(
    (sum, session) => sum + session.duration,
    0
  );
  const sessionsCompleted = sessions.length;

  return { totalFocusTime, sessionsCompleted };
};

const calculateStreaks = async (userId: number) => {
  const sessions = await prisma.focusSession.findMany({
    where: { user_id: userId },
    orderBy: { start_time: "asc" },
  });

  let currentStreak = 0;
  let longestStreak = 0;
  let lastDate: string | null = null;

  sessions.forEach((session) => {
    const sessionDate = session.start_time.toISOString().split("T")[0];
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
  calculateStreaks,
};
