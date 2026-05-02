import express from "express";
import {
  fetchAllImages,
  addImage,
  editImage,
  removeImage,
} from "../controllers/images.controller.js";
import protect from "../middlewares/auth.middleware.js";
import upload from "../lib/multer.js";

const router = express.Router();

router.get("/", fetchAllImages);
router.post("/", protect, upload.single("image"), addImage);
router.put("/:id", protect, upload.single("image"), editImage);
router.delete("/:id", protect, removeImage);

export default router;
