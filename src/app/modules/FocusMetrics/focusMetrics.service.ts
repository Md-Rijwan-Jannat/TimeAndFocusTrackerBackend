import Redis from "ioredis";
import prisma from "../../config/prismaClient";

const redis = new Redis();

const getFocusMetrics = async (userId: string, type: string) => {
  const cacheKey = `${userId}-${type}-metrics`;

  // Check Redis cache first
  const cachedMetrics = await redis.get(cacheKey);
  if (cachedMetrics) {
    return JSON.parse(cachedMetrics);
  }

  // Fetch data from the database
  const today = new Date();
  const startOfPeriod =
    type === "daily"
      ? new Date(today.setHours(0, 0, 0, 0))
      : new Date(today.setDate(today.getDate() - 7));

  const metrics = await prisma.focus_sessions.findMany({
    where: {
      user_id: parseInt(userId, 10),
      timestamp: {
        gte: startOfPeriod,
      },
    },
    select: {
      duration: true,
      timestamp: true,
    },
  });

  // Cache the results in Redis
  await redis.set(cacheKey, JSON.stringify(metrics), "EX", 60 * 60); // Cache for 1 hour

  return metrics;
};

const getStreaks = async (userId: string) => {
  const sessions = await prisma.focus_sessions.findMany({
    where: {
      user_id: parseInt(userId, 10),
    },
    orderBy: {
      timestamp: "asc",
    },
  });

  let currentStreak = 0;
  let longestStreak = 0;
  let lastDate: string | number | Date | null = null;

  sessions.forEach((session: { timestamp: string | number | Date }) => {
    const sessionDate = new Date(session.timestamp).toDateString();

    if (
      lastDate === null ||
      new Date(lastDate).getDate() + 1 === new Date(sessionDate).getDate()
    ) {
      currentStreak++;
    } else {
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 1;
    }
    lastDate = sessionDate;
  });

  longestStreak = Math.max(longestStreak, currentStreak);

  return { currentStreak, longestStreak };
};

export const FocusMetricsService = {
  getFocusMetrics,
  getStreaks,
};
