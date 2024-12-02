import express from "express";
import { createPost, getUserPosts, editUserPosts , getPost, createComment, getComments } from "../Controllers/UserController.js";
import { authenticateUser } from "../Middlewares/authMiddleware.js";

const router = express.Router();

// User routes are protected by authentication
router.use(authenticateUser);

// User can create a post
router.post("/posts", createPost);

// User can view their own posts
router.get("/posts", getUserPosts);

// Get a post by ID
router.get("/post/:id",getPost);

// User can edit their own posts 
router.patch("/posts/:id",editUserPosts);

// Users can add comments 
router.post("/post/:postId", createComment);

// get post comments 
router.get("/post/:postId", getComments);


export { router as UserRoutes };
