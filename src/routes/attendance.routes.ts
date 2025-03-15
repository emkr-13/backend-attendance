import express from "express";
import { sendSuccessResponse, sendErrorResponse } from "../utils/response";
import {
  recordAttendance,
  getAttendanceReport,
} from "../services/attendanceService";
import path from "path";
import fs from "fs/promises";
import { IncomingForm } from "formidable";

const router = express.Router();

// POST /api/attendance - Record attendance with photo upload
router.post("/", async (req, res) => {
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return sendErrorResponse(res, "Error parsing form data");
    }

    try {
      // Ambil userId dari body (tetap seperti ini)
      const userId = req.body.user?.id;
      if (!userId) {
        return sendErrorResponse(res, "User ID is required");
      }

      // Ambil lokasi dan IP address dari fields
      const location = Array.isArray(fields.location)
        ? fields.location[0]
        : fields.location || "";
      const ipAddress = Array.isArray(fields.ipAddress)
        ? fields.ipAddress[0]
        : fields.ipAddress || "";
      // Buat folder berdasarkan userId
      const uploadDir = `photo_employee/${userId}`;
      await fs.mkdir(uploadDir, { recursive: true });
      // Pastikan file diunggah
      console.log("cek", files.photo); // Debugging: Cek struktur files.photo

      const photoFile = Array.isArray(files.photo) ? files.photo[0] : files.photo;
      if (!photoFile || !photoFile.newFilename) {
        return sendErrorResponse(res, "Foto is required");
      }
      
      // Validasi tipe file (hanya gambar)
      const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!photoFile.mimetype || !allowedMimeTypes.includes(photoFile.mimetype)) {
        return sendErrorResponse(res, "Only image files are allowed");
      }

      // Simpan file dengan nama unik
      const timestamp = new Date().toISOString().replace(/:/g, "-");
      const ext = path.extname(photoFile.originalFilename || "");
      const filename = `${timestamp}_${userId}${ext}`;
      const filePath = path.join(uploadDir, filename);

      // Pindahkan file ke folder tujuan
      await fs.rename(photoFile.filepath, filePath);

      // Simpan data absensi ke database
      const result = await recordAttendance(
        userId,
        location,
        ipAddress,
        filePath
      );
      sendSuccessResponse(res, result, 200);
    } catch (error) {
      if (error instanceof Error) {
        sendErrorResponse(res, error.message);
      } else {
        sendErrorResponse(res, "An unknown error occurred");
      }
    }
  });
});

// GET /api/attendance - Get attendance report
router.get("/", async (req, res) => {
  try {
    // Ambil userId dari body (tetap seperti ini)
    const userId = req.body.user?.id;
    if (!userId) {
      return sendErrorResponse(res, "User ID is required");
    }

    // Dapatkan laporan absensi
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
