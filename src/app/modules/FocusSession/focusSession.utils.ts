import prisma from "../../config/prismaClient";
import AppError from "../../error/appError";

// Utility function to calculate new end time when the session is resumed
export const calculateNewEndTime = (
  pausedAt: Date,
  totalPausedTime: number,
  endedAt: Date
): Date => {
  const pauseDuration = Date.now() - pausedAt.getTime(); // Convert pausedAt to milliseconds
  const newTotalPausedTime = totalPausedTime + pauseDuration;
  return new Date(endedAt.getTime() + newTotalPausedTime); // Calculate new end time
};

// Helper function to format a time into "hour:minute:seconds"
const formatTime = (date: Date | null): string => {
  if (!date) return "N/A"; // Handle null dates
  return date.toLocaleTimeString("en-US", { hour12: false }); // Format time in 24-hour format
};

// Check and update the status of a focus session to "Complete" if the session has elapsed.
export const checkAndUpdateSessionCompletion = async (sessionId: number) => {
  const session = await prisma.focusSession.findUnique({
    where: { id: sessionId },
  });

  if (!session) {
    throw new AppError(404, "Focus session not found");
  }

  const currentTime = Date.now(); // Get current time in milliseconds
  const endedAt = session.endedAt ? new Date(session.endedAt).getTime() : null; // Convert endedAt to milliseconds

  // Log the formatted times
  console.log(
    currentTime >= (endedAt || 0),
    formatTime(new Date(currentTime)), // Format current time
    formatTime(session.endedAt ? new Date(session.endedAt) : null), // Format endedAt
    "Comparison"
  );

  // Check if session should be marked as complete
  if (session.status !== "Complete" && endedAt && currentTime >= endedAt) {
    const updatedSession = await prisma.focusSession.update({
      where: { id: sessionId },
      data: {
        status: "Complete",
        isComplete: true,
      },
    });
    return updatedSession;
  }

  return session; // Return the session if no update is required
};
