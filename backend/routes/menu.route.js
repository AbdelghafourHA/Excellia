import express from "express";
import {
  getAllMenu,
  updateMenuItem,
  updateMultipleMenu,
  resetMenu,
} from "../controllers/menu.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public route - anyone can view menu
router.get("/", getAllMenu);

// Protected routes - only admin can modify
router.put("/:day", protect, updateMenuItem);
router.put("/", protect, updateMultipleMenu);
router.post("/reset", protect, resetMenu);

export default router;
