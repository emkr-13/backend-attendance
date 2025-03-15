import express from "express";
import {
  recordAttendance,
  getAttendanceReport,
} from "../services/attendanceService";

const router = express.Router();

// Record Attendance
router.post("/attendance", async (req, res) => {
  try {
    const { userId, location, ipAddress, photo } = req.body;
    const result = await recordAttendance(userId, location, ipAddress, photo);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
});

// Get Attendance Report
router.get("/attendance/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const attendances = await getAttendanceReport(userId);
    res.json(attendances);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
});

export default router;
