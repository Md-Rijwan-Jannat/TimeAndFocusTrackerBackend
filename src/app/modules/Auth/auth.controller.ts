import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { generateToken } from "../../utils/jwt";

const register = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await AuthService.registerUser(name, email, password);
  const token = generateToken(user.id, user.role, user.email);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: user,
    accessToken: token,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, token } = await AuthService.loginUser(email, password);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login successful",
    data: user,
    accessToken: token,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const user = await AuthService.getUserById(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile fetched successfully",
    data: user,
  });
});

export const authController = { register, login, getProfile };
