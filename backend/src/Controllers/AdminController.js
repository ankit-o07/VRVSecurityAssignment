import { UserModel } from "../Models/UserModel.js";
import { PostModel } from "../Models/PostModel.js";

// Get all users for admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    console.log(users)
    res.status(200).json({ users:users, success:true });
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch users." , success:false});
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Unable to delete user." });
  }
};

// Create a post (Admin only)
export const createPost = async (req, res) => {
  try {
    const { title, content, categories, tags } = req.body;

    const newPost = new PostModel({
      title,
      content,
      author: req.user._id,  
      tags,
      status: "Pending",  
    });

    await newPost.save();
    res.status(201).json({ post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Unable to create post." });
  }
};

// Get all posts (Admin only)
export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("author", "name email").exec();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch posts." });
  }
};

// Make Moderator (Admin only)
export const makeModerator = async (req, res) => {
  try {
    const { id } = req.params; 

    // Find the user and update the role to "Moderator"
    const user = await UserModel.findByIdAndUpdate(
      id,
      { role: "Moderator" },
      { new: true } // Return the updated document
    );
    console.log("user")
    if (!user) {
      return res.status(404).json({ message: "User not found.", success: false });
    }

    res.status(200).json({ message: "User role updated to Moderator.", success: true, user });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Unable to update user role.", success: false });
  }
};
