import { Request, Response } from "express";
import { authService } from "./auth.service";
import { generateToken } from "../../utils/jwt";
import config from "../../config";

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    // Register the user and get the user object
    const user = await authService.registerUser(name, email, password);

    // Generate the JWT token after registration
    const token = generateToken(user.user_id);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        avatar_url: config.avatarUrl,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Login the user and get the token and user data
    const { token, user } = await authService.loginUser(email, password);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.user_id; // Extract the user ID from the JWT payload

    // Fetch the user profile using the userId
    const user = await authService.getUserById(userId);

    res.status(200).json({
      message: "User profile fetched successfully",
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const authController = {
  register,
  login,
};
