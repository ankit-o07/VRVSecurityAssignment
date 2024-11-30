import express from "express";
import { getAllUsers, deleteUser, createPost, getAllPosts } from "../Controllers/AdminController.js";
import { authenticateUser, authorizeRole } from "../Middlewares/authMiddleware.js";

const router = express.Router();

// Admin routes are protected by authentication and authorization (Admin only)
router.use(authenticateUser);

// Admin can manage users
router.get("/users", authorizeRole("Admin"), getAllUsers);  // Get all users
router.delete("/users/:id", authorizeRole("Admin"), deleteUser);  // Delete a user

// Admin can manage posts
router.post("/posts", authorizeRole("Admin"), createPost);  // Create a post
router.get("/posts", authorizeRole("Admin"), getAllPosts);  // Get all posts

export { router as AdminRoutes };
