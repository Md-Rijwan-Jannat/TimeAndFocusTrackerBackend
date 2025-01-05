import { FocusSessionService } from "./focusSession.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import AppError from "../../error/appError";

// Create a focus session
const createFocusSession = catchAsync(async (req, res) => {
  const session = await FocusSessionService.createFocusSession(
    req.body,
    Number(req.user.id)
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Focus session created successfully",
    data: session,
  });
});

// Get active session for a user
const getActiveSession = catchAsync(async (req, res) => {
  const session = await FocusSessionService.getActiveSession(
    Number(req.user.id)
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Active session retrieved successfully",
    data: session,
  });
});

// Get a focus session by ID
const getFocusSessionById = catchAsync(async (req, res) => {
  const { sessionId } = req.params;

  const session = await FocusSessionService.getFocusSessionById(
    Number(sessionId)
  );

  if (!session) {
    throw new AppError(httpStatus.NOT_FOUND, "Focus session not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Focus session retrieved successfully",
    data: session,
  });
});

// Update a focus session by ID
const updateFocusSession = catchAsync(async (req, res) => {
  const { sessionId } = req.params;
  const data = req.body;

  const updatedSession = await FocusSessionService.updateFocusSession(
    Number(sessionId),
    data
  );

  if (!updatedSession) {
    throw new AppError(httpStatus.NOT_FOUND, "Focus session not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Focus session updated successfully",
    data: updatedSession,
  });
});

// Delete a focus session by ID
const deleteFocusSession = catchAsync(async (req, res) => {
  const { sessionId } = req.params;

  await FocusSessionService.deleteFocusSession(Number(sessionId));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Focus session deleted successfully",
  });
});

// List all focus sessions for a user
const listFocusSessions = catchAsync(async (req, res) => {
  const sessions = await FocusSessionService.listFocusSessions(
    Number(req.user.id)
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Focus sessions retrieved successfully",
    data: sessions,
  });
});

// Update the focus session status
const updateFocusSessionStatus = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { status } = req.body;

  const updatedSession = await FocusSessionService.updateFocusSessionStatus(
    Number(userId),
    status
  );

  if (!updatedSession) {
    throw new AppError(httpStatus.NOT_FOUND, "Focus session not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Focus session status updated successfully",
    data: updatedSession,
  });
});

// Pause a focus session for a user
const pauseFocusSession = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const session = await FocusSessionService.pauseFocusSession(Number(userId));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Focus session paused successfully",
    data: session,
  });
});

// Resume a paused focus session for a user
const startFocusSession = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const session = await FocusSessionService.resumeFocusSession(Number(userId));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Focus session resumed successfully",
    data: session,
  });
});

export const FocusSessionController = {
  createFocusSession,
  getActiveSession,
  getFocusSessionById,
  updateFocusSession,
  deleteFocusSession,
  listFocusSessions,
  updateFocusSessionStatus,
  pauseFocusSession,
  startFocusSession,
};
