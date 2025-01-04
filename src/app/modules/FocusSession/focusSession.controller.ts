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
    statusCode: httpStatus.OK,
    message: "Focus session created successfully",
    data: session,
  });
});

// Get all focus sessions
const getAllFocusSessionsForUser = catchAsync(async (req, res) => {
  const sessions = await FocusSessionService.getAllFocusSessionsForUser(
    Number(req.user.id)
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All focus sessions retrieved",
    data: sessions,
  });
});

// Get focus session by ID
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
    message: "Focus session retrieved",
    data: session,
  });
});

// Update focus session
const updateFocusSession = catchAsync(async (req, res) => {
  const { sessionId } = req.params;
  const { startedAt, endedAt, focusDuration, isComplete } = req.body;

  const updatedSession = await FocusSessionService.updateFocusSession(
    Number(sessionId),
    {
      startedAt,
      endedAt,
      focusDuration,
      isComplete,
    }
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

// Delete focus session
const deleteFocusSession = catchAsync(async (req, res) => {
  const { sessionId } = req.params;

  const deletedSession = await FocusSessionService.deleteFocusSession(
    Number(sessionId)
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

export const focusSessionController = {
  createFocusSession,
  getAllFocusSessionsForUser,
  getFocusSessionById,
  updateFocusSession,
  deleteFocusSession,
};
