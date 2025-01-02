import { Request, Response } from "express";
import { authService } from "./auth.service";
import { generateToken } from "../../utils/jwt";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await authService.registerUser(name, email, password);
  const token = generateToken(user.user_id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered successfully",
    data: user,
    accessToken: token,
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const { token, user } = await authService.loginUser(email, password);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User login successful",
    data: user,
    accessToken: token,
  });
});

const getProfile = catchAsync(async (req, res) => {
  const userId = req.user.user_id;

  // Fetch the user profile using the userId
  const user = await authService.getUserById(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile fetched successfully",
    data: user,
  });
});

export const authController = {
  register,
  login,
  getProfile,
};
