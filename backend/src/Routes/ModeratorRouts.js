import express from "express";
import { moderatePost, moderateComment } from "../Controllers/ModeratorController.js";
import { authenticateUser, authorizeRole } from "../Middlewares/authMiddleware.js";

const router = express.Router();

// Moderator routes are protected by authentication and authorization (Moderator only)
router.use(authenticateUser);
router.use(authorizeRole("Moderator"));

// Moderator can approve/reject posts
router.patch("/posts/:id", moderatePost);  // Approve or Reject posts

// Moderator can approve/reject comments
router.patch("/comments/:id", moderateComment);  // Approve or Reject comments

export { router as ModeratorRoutes };
