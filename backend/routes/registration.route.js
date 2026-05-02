import express from "express";
import {
  submitRegistration,
  getAllRegistrations,
  getRegistrationById,
  updateRegistrationStatus,
  deleteRegistration,
  getRegistrationStats,
  deleteMultipleRegistrations,
} from "../controllers/registration.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public route - anyone can submit registration
router.post("/", submitRegistration);

// Protected routes - Admin only (all routes below require authentication)
router.get("/", protect, getAllRegistrations);
router.get("/stats/summary", protect, getRegistrationStats);
router.get("/:id", protect, getRegistrationById);
router.put("/:id/status", protect, updateRegistrationStatus);
router.delete("/:id", protect, deleteRegistration);
router.post("/bulk/delete", protect, deleteMultipleRegistrations);

export default router;
