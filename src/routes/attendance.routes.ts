import express from 'express';
import recordAttendance from '../controllers/attendance.controller';
import getAttendanceReport from '../controllers/attendance.controller';
const router = express.Router();

// Record Attendance
router.post('/attendance', recordAttendance);

// Get Attendance Report
router.get('/attendance/',  getAttendanceReport);

export default router;