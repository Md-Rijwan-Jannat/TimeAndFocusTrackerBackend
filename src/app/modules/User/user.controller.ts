import { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

// Get user by ID
const getUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.getUserById(Number(id));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User fetched successfully",
    data: user,
  });
});

// Update user details
const update = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
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
const remove = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await userService.deleteUser(Number(id));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User deleted successfully",
  });
});

export const userController = {
  getUser,
  update,
  remove,
};
