// Helper function to get date ranges
export const getDateRange = (type: "daily" | "weekly" | "monthly") => {
  const now = new Date();
  const start = new Date();
  const end = new Date();

  if (type === "daily") {
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
  } else if (type === "weekly") {
    const day = now.getDay();
    const diffToStartOfWeek = day === 0 ? -6 : 1 - day;
    start.setDate(now.getDate() + diffToStartOfWeek);
    start.setHours(0, 0, 0, 0);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
  } else if (type === "monthly") {
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    end.setMonth(start.getMonth() + 1);
    end.setDate(0);
    end.setHours(23, 59, 59, 999);
  }

  return { start, end };
};
