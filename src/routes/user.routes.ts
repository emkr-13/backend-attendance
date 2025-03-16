import express from "express";
import { updateUserProfile, getUserDetails } from "../services/userService";
import { sendSuccessResponse, sendErrorResponse } from "../utils/response";

const router = express.Router();

router.post("/update", async (req, res) => {
  try {
    const { fullName, position } = req.body;
    const userId = req.body.user.id;
    const result = await updateUserProfile(userId, fullName, position);
    sendSuccessResponse(res, result);
  } catch (error) {
    if (error instanceof Error) {
      sendErrorResponse(res, error.message);
    } else {
      sendErrorResponse(res, "An unknown error occurred");
    }
  }
});


router.get("/profile", async (req, res) => {
  try {
    const userId = req.body.user.id;
    const userDetails = await getUserDetails(userId);
    sendSuccessResponse(res, userDetails);
  } catch (error) {
    if (error instanceof Error) {
      sendErrorResponse(res, error.message);
    } else {
      sendErrorResponse(res, "An unknown error occurred");
    }
  }
});

export default router;