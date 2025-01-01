import express from "express";
import { focusSessionController } from "../FocusSession/focusSession.controller";

const router = express.Router();

router.post("/focus-session", focusSessionController.createFocusSession);

export const focusSessionRoutes = router;
