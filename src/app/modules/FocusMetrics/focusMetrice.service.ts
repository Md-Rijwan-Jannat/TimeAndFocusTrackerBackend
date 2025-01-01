import { prisma } from "../../config";

// Get focus metrics for a user (daily/weekly)
const getFocusMetrics = async (
  userId: number,
  startDate: string,
  endDate: string
) => {
  return prisma.focus_metrics.findMany({
    where: {
      user_id: userId,
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
  });
};

// Get streaks for a user
export const getStreaks = async (userId: number) => {
  const currentStreak = await prisma.focus_metrics.findFirst({
    where: { user_id: userId },
    orderBy: { date: "desc" },
  });

  const longestStreak = await prisma.focus_metrics.aggregate({
    _max: { streak_count: true },
  });

  return { currentStreak, longestStreak };
};

export const FocusMetricService = {
  getFocusMetrics,
  getStreaks,
};
