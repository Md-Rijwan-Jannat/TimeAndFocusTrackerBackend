// Helper function to get the start and end of a week (Monday to Sunday)
export const getStartEndOfWeek = (date: Date) => {
  const startOfWeek = new Date(date);
  const endOfWeek = new Date(date);

  const day = date.getDay();
  const diff = date.getDate() - day + (day == 0 ? -6 : 1); // Adjust when day is Sunday
  startOfWeek.setDate(diff);
  endOfWeek.setDate(diff + 6);

  startOfWeek.setHours(0, 0, 0, 0);
  endOfWeek.setHours(23, 59, 59, 999);

  return { startOfWeek, endOfWeek };
};
