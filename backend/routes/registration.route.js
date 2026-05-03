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
import rateLimit from "express-rate-limit";

const router = express.Router();

const submitLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many submissions, please try again later",
  },
});

// Public route - anyone can submit registration
router.post("/", submitLimiter, submitRegistration);

// Protected routes - Admin only (all routes below require authentication)
router.get("/", protect, getAllRegistrations);
router.get("/stats/summary", protect, getRegistrationStats);
router.get("/:id", protect, getRegistrationById);
router.put("/:id/status", protect, updateRegistrationStatus);
router.delete("/:id", protect, deleteRegistration);
router.post("/bulk/delete", protect, deleteMultipleRegistrations);

export default router;
