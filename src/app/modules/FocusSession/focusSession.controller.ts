import { Request, Response } from "express";
import { FocusSessionService } from "./focusSession.service";

// Create a new focus session
const createFocusSession = async (req: Request, res: Response) => {
  const { user_id, duration, session_type } = req.body;
  try {
    const session = await FocusSessionService.createFocusSession(
      user_id,
      duration,
      session_type
    );
    res.status(201).json({ message: "Focus session created", session });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const focusSessionController = { createFocusSession };
