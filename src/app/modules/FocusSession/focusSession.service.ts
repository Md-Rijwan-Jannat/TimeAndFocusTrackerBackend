import prisma from "../../config/prismaClient";
import AppError from "../../error/appError";
import httpStatus from "http-status";
import { TFocusSession } from "./focusSession.interface";
import { FocusSessionStatus } from "@prisma/client";
import { calculateNewEndTime } from "./focusSession.utils";

// Create a new focus session
const createFocusSession = async (
  payload: Partial<TFocusSession>,
  userId: number
) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const focusDuration = payload.focusDuration ?? 25;
  const breakDuration = payload.breakDuration ?? 5;

  if (focusDuration <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Focus duration must be greater than 0"
    );
  }

  if (breakDuration <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Break duration must be greater than 0"
    );
  }

  // Check for existing active session
  const activeSession = await prisma.focusSession.findFirst({
    where: { userId, status: { in: ["Active", "Paused"] } },
  });

  if (activeSession) {
    throw new AppError(
      httpStatus.CONFLICT,
      "You already have an active or paused focus session"
    );
  }

  const currentTime = new Date();
  const workSessionStartTime = new Date(currentTime);
  const workSessionEndTime = new Date(
    currentTime.getTime() + focusDuration * 60 * 1000
  );

  const newSession = await prisma.focusSession.create({
    data: {
      userId,
      startedAt: workSessionStartTime,
      endedAt: workSessionEndTime,
      focusDuration,
      breakDuration,
      status: "Active",
      isComplete: false,
    },
  });

  return newSession;
};

// Get active session for a user
const getActiveSession = async (userId: number) => {
  const userExists = await prisma.user.findUnique({ where: { id: userId } });

  console.log(userExists);

  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const activeSession = await prisma.focusSession.findFirst({
    where: { userId, status: "Active" },
  });

  console.log(activeSession);

  if (!activeSession) {
    throw new AppError(httpStatus.NOT_FOUND, "No active session found");
  }

  return activeSession;
};

// Pause a focus session
const pauseFocusSession = async (userId: number) => {
  const userExists = await prisma.user.findUnique({ where: { id: userId } });
  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const activeSession = await prisma.focusSession.findFirst({
    where: { userId, status: "Active" },
  });

  if (!activeSession) {
    throw new AppError(httpStatus.NOT_FOUND, "No active session to pause");
  }

  const currentTime = new Date();
  let totalPausedTime = activeSession.totalPausedTime || 0;

  if (activeSession.pausedAt) {
    const pausedDuration =
      currentTime.getTime() - activeSession.pausedAt.getTime();
    totalPausedTime -= pausedDuration; // Subtract the previous pause duration
  }

  await prisma.focusSession.update({
    where: { id: activeSession.id },
    data: {
      status: "Paused",
      pausedAt: currentTime,
      totalPausedTime,
    },
  });

  return activeSession;
};

// Resume a paused session
const resumeFocusSession = async (userId: number) => {
  const userExists = await prisma.user.findUnique({ where: { id: userId } });
  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const pausedSession = await prisma.focusSession.findFirst({
    where: { userId, status: "Paused" },
  });

  if (!pausedSession) {
    throw new AppError(httpStatus.NOT_FOUND, "No paused session to resume");
  }

  const currentTime = new Date();
  const newEndTime = calculateNewEndTime(
    pausedSession.pausedAt as Date,
    pausedSession.totalPausedTime,
    pausedSession.endedAt as Date
  );

  await prisma.focusSession.update({
    where: { id: pausedSession.id },
    data: {
      status: "Active",
      resumedAt: currentTime,
      endedAt: newEndTime,
      pausedAt: null,
    },
  });

  return pausedSession;
};

// Update focus session status (active, paused, or complete)
const updateFocusSessionStatus = async (
  userId: number,
  status: "Active" | "Paused" | "Complete"
) => {
  const userExists = await prisma.user.findUnique({ where: { id: userId } });
  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const activeSession = await prisma.focusSession.findFirst({
    where: { userId, status: { in: ["Active", "Paused"] } },
  });

  if (!activeSession) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "No active session found to update"
    );
  }

  const updatedSession = await prisma.focusSession.update({
    where: { id: activeSession.id },
    data: {
      status,
      isComplete: status === "Complete",
    },
  });

  return updatedSession;
};

// List all focus sessions for a user
const listFocusSessions = async (userId: number) => {
  const userExists = await prisma.user.findUnique({ where: { id: userId } });
  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const sessions = await prisma.focusSession.findMany({ where: { userId } });
  if (!sessions.length) {
    throw new AppError(httpStatus.NOT_FOUND, "No focus sessions found");
  }

  return sessions;
};

// Get a focus session by ID
const getFocusSessionById = async (sessionId: number) => {
  const session = await prisma.focusSession.findUnique({
    where: { id: sessionId },
  });
  if (!session) {
    throw new AppError(httpStatus.NOT_FOUND, "Focus session not found");
  }

  return session;
};

// Delete a focus session by ID
const deleteFocusSession = async (sessionId: number) => {
  const session = await prisma.focusSession.findUnique({
    where: { id: sessionId },
  });
  if (!session) {
    throw new AppError(httpStatus.NOT_FOUND, "Focus session not found");
  }

  await prisma.focusSession.delete({ where: { id: sessionId } });
};

// Update focus session duration
const updateFocusSession = async (id: number, payload: TFocusSession) => {
  const sessionExists = await prisma.focusSession.findUnique({ where: { id } });
  if (!sessionExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Focus session not found");
  }

  const updatedSession = await prisma.focusSession.update({
    where: { id },
    data: {
      ...payload,
      status: payload?.status as FocusSessionStatus,
    },
  });

  return updatedSession;
};

export const FocusSessionService = {
  createFocusSession,
  getActiveSession,
  pauseFocusSession,
  resumeFocusSession,
  updateFocusSessionStatus,
  listFocusSessions,
  getFocusSessionById,
  deleteFocusSession,
  updateFocusSession,
};
