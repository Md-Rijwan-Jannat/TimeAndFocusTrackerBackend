import { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../error/appError";

// Get user by ID
const getAllUser = catchAsync(async (req, res) => {
  const { result, meta } = await userService.getAllUser(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Users retrieved successfully",
    meta: meta,
    data: result,
  });
});

// Get user by ID
const getUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await userService.getUserById(Number(userId));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User fetched successfully",
    data: user,
  });
});

// Update user details
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const userId = req.params.userId;

  if (id !== Number(userId)) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to perform this action"
    );
  }

  const updatedData = req.body;

  const updatedUser = await userService.updateUser(Number(id), updatedData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User updated successfully",
    data: updatedUser,
  });
});

// Delete user by ID
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  await userService.deleteUser(Number(userId));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User deleted successfully",
  });
});

export const userController = {
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
};
