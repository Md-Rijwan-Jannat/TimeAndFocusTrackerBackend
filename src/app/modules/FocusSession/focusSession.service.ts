import { prisma } from "../../config";

// Create a new focus session
const createFocusSession = async (
  userId: number,
  duration: number,
  sessionType: string
) => {
  return prisma.focus_sessions.create({
    data: {
      user_id: userId,
      duration,
      session_type: sessionType,
      is_successful: true,
    },
  });
};

export const FocusSessionService = {
  createFocusSession,
};
