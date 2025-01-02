import prisma from "../../config/prismaClient";
import AppError from "../../error/appError";
import { TFocusSession } from "./focusSession.interface";
import httpStatus from "http-status";

const createFocusSession = async (
  payload: Omit<TFocusSession, "session_id">,
  userId: number
): Promise<TFocusSession> => {
  const user = await prisma.user.findUnique({
    where: { user_id: userId },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return prisma.focusSession.create({
    data: {
      user_id: userId,
      start_time: new Date(payload.start_time),
      end_time: new Date(payload.end_time),
      duration: payload.duration,
      session_type: payload.session_type,
      is_successful: false,
    },
  });
};

const getAllFocusSessionsForUser = async (
  userId: number
): Promise<TFocusSession[]> => {
  const userExists = await prisma.user.findUnique({
    where: { user_id: userId },
  });

  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Retrieve all focus sessions for the user
  const sessions = await prisma.focusSession.findMany({
    where: { user_id: userId },
  });

  if (sessions.length === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "No focus sessions found for this user"
    );
  }

  return sessions;
};

const getFocusSessionById = async (
  session_id: number
): Promise<TFocusSession | null> => {
  return prisma.focusSession.findUnique({ where: { session_id } });
};

const updateFocusSession = async (
  session_id: number,
  data: Partial<Omit<TFocusSession, "session_id" | "user_id">>
): Promise<TFocusSession | null> => {
  return prisma.focusSession.update({
    where: { session_id },
    data: {
      ...data,
      start_time: data.start_time ? new Date(data.start_time) : undefined,
      end_time: data.end_time ? new Date(data.end_time) : undefined,
    },
  });
};

const deleteFocusSession = async (
  session_id: number
): Promise<TFocusSession | null> => {
  return prisma.focusSession.delete({ where: { session_id } });
};

export const FocusSessionService = {
  createFocusSession,
  getAllFocusSessionsForUser,
  getFocusSessionById,
  updateFocusSession,
  deleteFocusSession,
};
