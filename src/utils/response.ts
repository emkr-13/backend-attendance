import { Response } from 'express';

// Fungsi untuk mengirim respons sukses
export const sendSuccessResponse = (
  res: Response,
  data: any,
  statusCode: number = 200
) => {
  res.status(statusCode).json({
    success: true,
    data,
  });
};

// Fungsi untuk mengirim respons error
export const sendErrorResponse = (
  res: Response,
  message: string,
  statusCode: number = 400
) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};