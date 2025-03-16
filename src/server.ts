import express from "express";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import attendanceRoutes from "./routes/attendance.routes";
import { authenticateToken } from "./middlewares/auth.middleware";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./swagger.jsdoc";
const path = require('path'); // Import Swagger

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3080;

// Middleware
app.use(cors());
app.use(express.json());

// Menyajikan file statis dari direktori 'photo_employee'
app.use('/photo_employee', express.static(path.join(__dirname, '../photo_employee')));
// Public Routes
app.use("/api/auth", authRoutes);

// Protected Routes (Memerlukan token JWT)
app.use("/api/users", authenticateToken, userRoutes);
app.use("/api/attendance", authenticateToken, attendanceRoutes);

// Default route
app.get("/", (_req, res) => {
  res.send("Welcome to the Attendance Backend API");
});

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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