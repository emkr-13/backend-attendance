import moment from "moment-timezone";

// Format tanggal dengan timezone
export const formatDateWithTimezone = (
  date: Date,
  timezone: string = "Asia/Jakarta",
  format: string = "YYYY-MM-DD HH:mm:ss"
) => {
  return moment(date).tz(timezone).format(format);
};

// Generate random string (untuk keperluan seperti kode OTP)
export const generateRandomString = (length: number = 6) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Penanganan kesalahan umum
export const errorHandler = (
  error: Error,
  functionName: string,
  errorDetails: object
) => {
  console.error(`Error in ${functionName}:`, error, errorDetails);
  return { error: error.message, details: errorDetails };
};
