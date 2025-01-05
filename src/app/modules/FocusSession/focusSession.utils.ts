import prisma from "../../config/prismaClient";
import AppError from "../../error/appError";

// Utility function to calculate new end time when the session is resumed
export const calculateNewEndTime = (
  pausedAt: Date,
  totalPausedTime: number,
  endedAt: Date
): Date => {
  const pauseDuration = new Date().getTime() - pausedAt.getTime();
  const newTotalPausedTime = totalPausedTime + pauseDuration;
  return new Date(endedAt.getTime() + newTotalPausedTime);
};

// Check and update the status of a focus session to "Complete" if the session has elapsed.
export const checkAndUpdateSessionCompletion = async (sessionId: number) => {
  const session = await prisma.focusSession.findUnique({
    where: { id: sessionId },
  });

  if (!session) {
    throw new AppError(404, "Focus session not found");
  }

  const currentTime = new Date();
  const { endedAt, status } = session;

  // Check if session should be marked as complete
  if (status !== "Complete" && endedAt && currentTime >= endedAt) {
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
