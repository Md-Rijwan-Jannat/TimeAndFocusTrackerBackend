import prisma from "../../config/prismaClient";
import AppError from "../../error/appError";
import { TFocusSession } from "./focusSession.interface";
import httpStatus from "http-status";

// Create focus session
const createFocusSession = async (
  payload: TFocusSession,
  userId: number
): Promise<TFocusSession[]> => {
  const user = await prisma.user.findUnique({
    where: { user_id: userId },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const { duration, session_type, note } = payload;

  // Define work and break durations in minutes
  const workDuration = 25;
  const breakDuration = 5;

  // Calculate total cycles
  const totalCycles = Math.floor(duration / (workDuration + breakDuration));

  // Get the current time for the session start
  let currentTime = new Date();

  // Array to store created sessions
  const createdSessions: TFocusSession[] = [];

  for (let i = 0; i < totalCycles; i++) {
    const workSessionStartTime = new Date(currentTime);
    const workSessionEndTime = new Date(
      currentTime.getTime() + workDuration * 60 * 1000
    );

    const focusSession = await prisma.focusSession.create({
      data: {
        user_id: userId,
        start_time: workSessionStartTime,
        end_time: workSessionEndTime,
        duration: workDuration,
        session_type: session_type,
        note: note,
        is_successful: false,
      },
    });

    createdSessions.push(focusSession);

    // Update current time to include break
    currentTime = new Date(
      workSessionEndTime.getTime() + breakDuration * 60 * 1000
    );
  }

  return createdSessions;
};

// Get all focus sessions
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
