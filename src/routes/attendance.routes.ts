import express from "express";
import { recordAttendance, getAttendanceReport } from "../services/attendanceService";
import { sendSuccessResponse, sendErrorResponse } from "../utils/response";
import { upload } from "../utils/file"; // Middleware multer

const router = express.Router();

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