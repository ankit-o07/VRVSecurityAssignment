import { PostModel } from "../Models/PostModel.js";
import { CommentModel } from "../Models/CommentModel.js";

export const getAllPost = async (req,res) => {
    
    try {
        const posts = await PostModel.find()
        
        res.status(200).json({ posts:posts, success:true });
      } catch (error) {
        res.status(500).json({ message: "Unable to fetch posts." });
      }
}