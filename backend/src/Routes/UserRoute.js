import express from "express";
import { createPost, getUserPosts } from "../Controllers/UserController.js";
import { authenticateUser } from "../Middlewares/authMiddleware.js";

const router = express.Router();

// User routes are protected by authentication
router.use(authenticateUser);

// User can create a post
router.post("/posts", createPost);

// User can view their own posts
router.get("/posts", getUserPosts);

export { router as UserRoutes };
