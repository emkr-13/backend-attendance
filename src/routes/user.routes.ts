import express from "express";
import { updateUserProfile, getUserDetails } from "../services/userService";
import { sendSuccessResponse, sendErrorResponse } from "../utils/response";

const router = express.Router();

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               position:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request or invalid data
 */
router.put("/profile", async (req, res) => {
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

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user details
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 fullName:
 *                   type: string
 *                 position:
 *                   type: string
 *       400:
 *         description: Bad request or user not found
 */
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