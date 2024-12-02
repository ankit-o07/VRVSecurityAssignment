import express from "express";
import { authenticateUser } from "../Middlewares/authMiddleware.js";
import { getAllPost } from "../Controllers/RootController.js";

const router = express.Router();



// User can create a post
router.get("/", getAllPost);




export { router as RootRoutes };
