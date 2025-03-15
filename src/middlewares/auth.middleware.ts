import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

// Middleware untuk memeriksa token JWT
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  // Periksa apakah header Authorization ada
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token provided' });
    return; // Hentikan eksekusi dengan return tanpa nilai
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifikasi token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    // Cari pengguna berdasarkan ID dari token
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: decoded.userId });

    if (!user) {
      res.status(403).json({ message: 'Invalid or expired token' });
      return;
    }

    // Tambahkan user ke request object
    req.body.user = user;
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.error('JWT Verification Error:', error.message);
    } else {
      console.error('JWT Verification Error:', error);
    }
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }
};