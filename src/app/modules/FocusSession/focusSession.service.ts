import prisma from "../../config/prismaClient";
import AppError from "../../error/appError";
import httpStatus from "http-status";
import { TFocusSession } from "./focusSession.interface";
import { FocusSessionStatus } from "@prisma/client";

// Create a new focus session
const createFocusSession = async (
  payload: Partial<TFocusSession>,
  userId: number
) => {
  // Check if the user exists
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Use provided focusDuration and breakDuration or fallback to default values
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

  // Check if the user already has an active focus session
  const activeSession = await prisma.focusSession.findFirst({
    where: {
      userId,
      status: "Active",
    },
  });

  if (activeSession) {
    throw new AppError(
      httpStatus.CONFLICT,
      "You already have an active focus session"
    );
  }

  // Calculate focus session cycles
  const totalCycles = Math.floor(
    focusDuration / (focusDuration + breakDuration)
  );

  if (totalCycles === 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Focus duration is too short to create any session"
    );
  }

  let currentTime = new Date();
  const createdSessions = [];

  // Create focus session cycles
  for (let i = 0; i < totalCycles; i++) {
    const workSessionStartTime = new Date(currentTime);
    const workSessionEndTime = new Date(
      currentTime.getTime() + focusDuration * 60 * 1000
    );

    const focusSession = await prisma.focusSession.create({
      data: {
        userId,
        startedAt: workSessionStartTime,
        endedAt: workSessionEndTime,
        focusDuration,
        breakDuration,
        isComplete: false,
        status: "Active",
      },
    });

    createdSessions.push(focusSession);

    // Update current time to the end of the break
    currentTime = new Date(
      workSessionEndTime.getTime() + breakDuration * 60 * 1000
    );
  }

  return createdSessions;
};

// Get active session for a user
const getActiveSession = async (userId: number) => {
  const userExists = await prisma.user.findUnique({ where: { id: userId } });

  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const activeSession = await prisma.focusSession.findFirst({
    where: { userId, status: "Active" },
  });

  if (!activeSession) {
    throw new AppError(httpStatus.NOT_FOUND, "No active session found");
  }

  return activeSession;
};

// Get a focus session by ID
const getFocusSessionById = async (id: number) => {
  const session = await prisma.focusSession.findUnique({ where: { id } });

  if (!session) {
    throw new AppError(httpStatus.NOT_FOUND, "Focus session not found");
  }

  return session;
};

// Update a focus session by ID
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

// Delete a focus session by ID
const deleteFocusSession = async (id: number) => {
  const sessionExists = await prisma.focusSession.findUnique({ where: { id } });

  if (!sessionExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Focus session not found");
  }

  const deletedSession = await prisma.focusSession.delete({ where: { id } });

  return deletedSession;
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

// Update focus session status for a user
const updateFocusSessionStatus = async (
  userId: number,
  status: "Active" | "Paused" | "Complete"
) => {
  const userExists = await prisma.user.findUnique({ where: { id: userId } });

  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const activeSession = await prisma.focusSession.findFirst({
    where: { userId, status: "Active" },
  });

  if (!activeSession) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "No active session found to update"
    );
  }

  const updatedSession = await prisma.focusSession.update({
    where: { id: activeSession.id },
    data: { status: status === "Complete" ? "Complete" : status },
  });

  return updatedSession;
};

// Start a focus session for a user
const startFocusSession = async (userId: number) => {
  const userExists = await prisma.user.findUnique({ where: { id: userId } });

  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const activeSession = await prisma.focusSession.findFirst({
    where: { userId, status: "Active" },
  });

  if (activeSession) {
    throw new AppError(httpStatus.CONFLICT, "An active session already exists");
  }

  const newSession = await prisma.focusSession.create({
    data: {
      userId,
      startedAt: new Date(),
      focusDuration: 25,
      breakDuration: 5,
      status: "Active",
      isComplete: false,
    },
  });

  return newSession;
};

export const FocusSessionService = {
  createFocusSession,
  getActiveSession,
  getFocusSessionById,
  updateFocusSession,
  deleteFocusSession,
  listFocusSessions,
  updateFocusSessionStatus,
  startFocusSession,
};
