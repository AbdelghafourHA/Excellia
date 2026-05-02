import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";

import adminRoutes from "./routes/admin.route.js";
import imageRoutes from "./routes/images.route.js";
import menuRoutes from "./routes/menu.route.js";
import registrationRoutes from "./routes/registration.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/admin", adminRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/registrations", registrationRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server startup failed:", err);
    process.exit(1);
  }
};

startServer();
