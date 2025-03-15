import express from "express";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import attendanceRoutes from "./routes/attendance.routes";
import { authenticateToken } from "./middlewares/auth.middleware";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3080;

// Middleware
app.use(cors());
app.use(express.json());

// Public Routes
app.use("/api/auth", authRoutes);

// Protected Routes (Memerlukan token JWT)
app.use("/api/users", authenticateToken, userRoutes);
app.use("/api/attendance", authenticateToken, attendanceRoutes);

// Default route
app.get("/", (_req, res) => {
  res.send("Welcome to the Attendance Backend API");
});

// Inisialisasi database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
