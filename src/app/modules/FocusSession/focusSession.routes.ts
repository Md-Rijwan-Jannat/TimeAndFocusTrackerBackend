import express from "express";
import { focusSessionController } from "./focusSession.controller";

const router = express.Router();

router.post("/", focusSessionController.createFocusSession);
router.get("/", focusSessionController.getAllFocusSessions);
router.get("/:id", focusSessionController.getFocusSessionById);
router.put("/:id", focusSessionController.updateFocusSession);
router.delete("/:id", focusSessionController.deleteFocusSession);

export const focusSessionRoutes = router;
