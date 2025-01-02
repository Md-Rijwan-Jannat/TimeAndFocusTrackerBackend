import prisma from "../../config/prismaClient";

const createFocusSession = async (
  user_id: number,
  duration: number,
  timestamp: string
) => {
  return prisma.focus_sessions.create({
    data: {
      user_id,
      duration,
      timestamp: new Date(timestamp),
    },
  });
};

const getAllFocusSessions = async () => {
  return prisma.focus_sessions.findMany();
};

const getFocusSessionById = async (id: number) => {
  return prisma.focus_sessions.findUnique({ where: { id } });
};

const updateFocusSession = async (
  id: number,
  data: { duration?: number; timestamp?: string }
) => {
  return prisma.focus_sessions.update({
    where: { id },
    data: {
      duration: data.duration,
      timestamp: data.timestamp ? new Date(data.timestamp) : undefined,
    },
  });
};

const deleteFocusSession = async (id: number) => {
  return prisma.focus_sessions.delete({ where: { id } });
};

export const FocusSessionService = {
  createFocusSession,
  getAllFocusSessions,
  getFocusSessionById,
  updateFocusSession,
  deleteFocusSession,
};
