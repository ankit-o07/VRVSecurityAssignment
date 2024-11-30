import { PostModel } from "../Models/PostModel.js";

// Create a post (User only)
export const createPost = async (req, res) => {
  try {
    const { title, content, categories, tags } = req.body;

    const newPost = new PostModel({
      title,
      content,
      author: req.user._id,  
      categories,
      tags,
      status: "Pending",  // User's post will be pending approval by Admin
    });

    await newPost.save();
    res.status(201).json({ post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Unable to create post." });
  }
};

// Get all posts created by the user
export const getUserPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({ author: req.user._id });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch posts." });
  }
};
