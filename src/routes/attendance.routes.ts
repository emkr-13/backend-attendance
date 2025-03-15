import express from "express";
import { recordAttendance, getAttendanceReport } from "../services/attendanceService";
import { sendSuccessResponse, sendErrorResponse } from "../utils/response";
import { upload } from "../utils/file"; // Middleware multer

const router = express.Router();

/**
 * @swagger
 * /api/attendance:
 *   post:
 *     summary: Record attendance with photo upload
 *     tags:
 *       - Attendance
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *               ipAddress:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Attendance recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request or invalid data
 */
router.post(
  "/",
  upload.single("photo"),
  async (req, res) => {
    try {
      const userId = req.body.user.id;
      const { location, ipAddress } = req.body;
      const photoUrl = req.file?.path || "";
      const result = await recordAttendance(userId, location, ipAddress, photoUrl);
      sendSuccessResponse(res, result, 200);
    } catch (error) {
      if (error instanceof Error) {
        sendErrorResponse(res, error.message);
      } else {
        sendErrorResponse(res, "An unknown error occurred");
      }
    }
  }
);

/**
 * @swagger
 * /api/attendance:
 *   get:
 *     summary: Get attendance report for the authenticated user
 *     tags:
 *       - Attendance
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Attendance report retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   location:
 *                     type: string
 *                   ipAddress:
 *                     type: string
 *                   photo:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Bad request or user not found
 */
router.get("/", async (req, res) => {
  try {
    const userId = req.body.user.id;
    const attendances = await getAttendanceReport(userId);
    sendSuccessResponse(res, attendances, 200);
  } catch (error) {
    if (error instanceof Error) {
      sendErrorResponse(res, error.message);
    } else {
      sendErrorResponse(res, "An unknown error occurred");
    }
  }
});

export default router;