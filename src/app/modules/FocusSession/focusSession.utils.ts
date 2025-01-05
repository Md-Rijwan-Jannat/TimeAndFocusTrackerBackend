import prisma from "../../config/prismaClient";

/**
 * Utility to calculate the new end time when a session is resumed from pause.
 * @param pausedAt - The time the session was paused.
 * @param totalPausedTime - Total paused time in milliseconds.
 * @param endedAt - The original endedAt time.
 * @returns New endedAt time.
 */
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

/**
 * Updates the status of a focus session based on time properties.
 * @param session - The focus session object.
 */
export const updateFocusSessionStatus = async (session: {
  id: number;
  startedAt: Date;
  pausedAt: Date | null;
  endedAt: Date | null;
  status: string;
  totalPausedTime: number;
}) => {
  const currentTime = new Date();

  if (session.pausedAt) {
    // If the session is paused, calculate new end time and keep status as "Paused"
    const newEndedAt = session.endedAt
      ? calculateNewEndTime(
          session.pausedAt,
          session.totalPausedTime,
          session.endedAt
        )
      : null;

    await prisma.focusSession.update({
      where: { id: session.id },
      data: {
        endedAt: newEndedAt || undefined,
        totalPausedTime:
          session.totalPausedTime +
          (currentTime.getTime() - session.pausedAt.getTime()),
        status: "Paused",
      },
    });
  } else if (session.endedAt && currentTime >= session.endedAt) {
    // If the session has ended, mark as "Complete"
    await prisma.focusSession.update({
      where: { id: session.id },
      data: {
        status: "Complete",
        isComplete: true,
      },
    });
  } else {
    // If the session is ongoing, keep status as "Active"
    await prisma.focusSession.update({
      where: { id: session.id },
      data: {
        status: "Active",
      },
    });
  }
};

/**
 * Function to automatically update session statuses.
 * Should be triggered periodically (e.g., via a scheduled job).
 */
export const updateAllSessionStatuses = async () => {
  const sessions = await prisma.focusSession.findMany({
    where: {
      OR: [{ status: "Active" }, { status: "Paused" }],
    },
  });

  for (const session of sessions) {
    await updateFocusSessionStatus(session);
  }
};
