import jwt, { SignOptions } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Generate JWT Token
export const generateToken = (userId: string, expiresIn: string = "1h") => {
  const options: SignOptions = { expiresIn: expiresIn as SignOptions["expiresIn"] };
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, options);
};

// Verify JWT Token
export const verifyToken = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    return decoded.userId;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return null;
  }
};

// Middleware untuk memeriksa token di header Authorization
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  const userId = verifyToken(token);

  if (!userId) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }

  req.body.userId = userId; // Tambahkan userId ke request body
  next();
};
