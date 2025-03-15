import express from "express";
import { sendSuccessResponse, sendErrorResponse } from "../utils/response";
import { registerUser, loginUser } from "../services/authService";

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { username, password, fullName } = req.body;
    const result = await registerUser(username, password, fullName);
    sendSuccessResponse(res, result, 201);
  } catch (error) {
    if (error instanceof Error) {
      sendErrorResponse(res, error.message);
    } else {
      sendErrorResponse(res, "An unknown error occurred");
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { token, refreshToken } = await loginUser(username, password);
    sendSuccessResponse(res, { token, refreshToken }, 200);
  } catch (error) {
    if (error instanceof Error) {
      sendErrorResponse(res, error.message);
    } else {
      sendErrorResponse(res, "An unknown error occurred");
    }
  }
});

export default router;