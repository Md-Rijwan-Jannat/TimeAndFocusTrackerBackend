import { FocusSessionService } from "./focusSession.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import AppError from "../../error/appError";

// Create focus session
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

// Get active focus session for a user
const getActiveSession = catchAsync(async (req, res) => {
  const activeSession = await FocusSessionService.getActiveSession(
    Number(req.params.userId)
  );

  if (!activeSession) {
    throw new AppError(httpStatus.NOT_FOUND, "No active session found");
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Active focus session retrieved",
    data: activeSession,
  });
});

// Get focus session by ID
const getFocusSessionById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const session = await FocusSessionService.getFocusSessionById(Number(id));

  if (!session) {
    throw new AppError(httpStatus.NOT_FOUND, "Focus session not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Focus session retrieved",
    data: session,
  });
});

// Update focus session by ID
const updateFocusSession = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const updatedSession = await FocusSessionService.updateFocusSession(
    Number(id),
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

// Delete focus session by ID
const deleteFocusSession = catchAsync(async (req, res) => {
  const { id } = req.params;

  const deletedSession = await FocusSessionService.deleteFocusSession(
    Number(id)
  );

  if (!deletedSession) {
    throw new AppError(httpStatus.NOT_FOUND, "Focus session not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Focus session deleted successfully",
    data: deletedSession,
  });
});

// List all focus sessions for a user
const listFocusSessions = catchAsync(async (req, res) => {
  const sessions = await FocusSessionService.listFocusSessions(
    Number(req.params.userId)
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Focus sessions retrieved successfully",
    data: sessions,
  });
});

// Update focus session status
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

// Start a focus session for a user
const startFocusSession = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const session = await FocusSessionService.startFocusSession(Number(userId));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Focus session started successfully",
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
  startFocusSession,
};
