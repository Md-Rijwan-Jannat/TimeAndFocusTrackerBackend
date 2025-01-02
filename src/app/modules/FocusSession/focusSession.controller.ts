import { Request, Response } from "express";
import { FocusSessionService } from "./focusSession.service";

const createFocusSession = async (req: Request, res: Response) => {
  const { user_id, duration, timestamp } = req.body;

  try {
    const session = await FocusSessionService.createFocusSession(
      user_id,
      duration,
      timestamp
    );
    res
      .status(201)
      .json({ message: "Focus session created successfully", session });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getAllFocusSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await FocusSessionService.getAllFocusSessions();
    res.status(200).json({ message: "All focus sessions retrieved", sessions });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getFocusSessionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const session = await FocusSessionService.getFocusSessionById(Number(id));
    if (!session) {
      res.status(404).json({ message: "Focus session not found" });
      return;
    }
    res.status(200).json({ message: "Focus session retrieved", session });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const updateFocusSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { duration, timestamp } = req.body;

  try {
    const updatedSession = await FocusSessionService.updateFocusSession(
      Number(id),
      {
        duration,
        timestamp,
      }
    );

    if (!updatedSession) {
      res.status(404).json({ message: "Focus session not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Focus session updated successfully", updatedSession });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const deleteFocusSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const deleted = await FocusSessionService.deleteFocusSession(Number(id));

    if (!deleted) {
      res.status(404).json({ message: "Focus session not found" });
      return;
    }

    res.status(200).json({ message: "Focus session deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const focusSessionController = {
  createFocusSession,
  getAllFocusSessions,
  getFocusSessionById,
  updateFocusSession,
  deleteFocusSession,
};
