import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs/promises";

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const userId = req.body.user.id;
    const uploadDir = `photo_employee/${userId}`;

    // Buat folder jika belum ada
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error as Error, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString().replace(/:/g, "-");
    const userId = req.body.user.id;
    const ext = path.extname(file.originalname);
    const filename = `${timestamp}_${userId}${ext}`;
    cb(null, filename);
  },
});

// Filter file hanya gambar
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal 5MB
});
