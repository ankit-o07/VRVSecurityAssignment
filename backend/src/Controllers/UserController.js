import { PostModel } from "../Models/PostModel.js";
import { CommentModel } from "../Models/CommentModel.js";

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
    res.status(201).json({ success: true, message: "post create successfullly" });
  } catch (error) {
    res.status(500).json({ message: "Unable to create post.", success: false });
  }
};

// Get all posts created by the user
export const getUserPosts = async (req, res) => {

  try {
    const posts = await PostModel.find({ author: req.user._id });
    res.status(200).json({ posts: posts, success: true });
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch posts.", success: false });
  }
};

// Get a post by ID
export const getPost = async (req, res) => {
  try {
    let owner = false
    const { id } = req.params;
    console.log( id )
    // Find the post in the database by its ID
    const post = await PostModel.findById(id);

    // If the post is not found, return a 404 error
    if (!post) {
      return res.status(404).json({ message: "Post not found", success: false });
    }


    // Check if the user is the author of the post (to prevent unauthorized editing)
    
    if (post.author.toString() === req.user._id.toString()) {
      owner = true
    }

    // If the post is found, send the post data in the response
    res.status(200).json({ post: post, success: true, owner: owner });

  } catch (err) {

    // If an error occurs, return a 500 error with a failure message
    res.status(500).json({ message: "Unable to fetch posts.", success: false });
  }
}




// Edit a post (User only can edit their own posts)
export const editUserPosts = async (req, res) => {
  try {
    const { id } = req.params;  // Post ID from the URL
    const { title, content, categories, tags } = req.body;  // New data from the request body

    // Find the post by ID
    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found", success: false });
    }

    // Check if the user is the author of the post (to prevent unauthorized editing)
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only edit your own posts", success: false });
    }

    // Update the post data
    post.title = title || post.title;  // Only update fields if new data is provided
    post.content = content || post.content;
    post.categories = categories || post.categories;
    post.tags = tags || post.tags;

    // Save the updated post
    await post.save();

    // Respond with success message and updated post
    res.status(200).json({
      message: "Post updated successfully",
      success: true,
      post,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Unable to update post", success: false });
  }
};




// Delete a post (User only can delete their own posts)
export const deleteUserPost = async (req, res) => {
  try {
    const { id } = req.params;  // Post ID from the URL

    // Find the post by ID
    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found", success: false });
    }

    // Check if the user is the author of the post (to prevent unauthorized deletion)
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own posts", success: false });
    }

    // Delete the post
    await post.remove();

    // Respond with a success message
    res.status(200).json({ message: "Post deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Unable to delete post", success: false });
  }
};



// Add User comment
export const createComment = async (req, res) => {
  try {

    // Extract content and postId from the request
    const { content } = req.body;
    const { postId } = req.params;

    // Ensure the post exists
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found", success: false });
    }

    // Create a new comment
    const newComment = new CommentModel({
      content,
      author: userId,
      post: postId,
    });

    // Save the comment to the database
    await newComment.save();

    // Add the comment to the post's comments array
    post.comments.push(newComment._id);
    await post.save();

    // Respond with success
    res.status(201).json({
      message: "Comment created successfully",
      success: true,
      comment: newComment,
    });
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ message: "Unable to create comment", success: false });
  }
};


// Get User comments
export const getComments = async (req, res) => {
  try {
    const { postId } = req.params; 

    
    const post = await PostModel.findById(postId).populate("comments");
    if (!post) {
      return res.status(404).json({ message: "Post not found", success: false });
    }

    // Retrieve the comments for the post
    const comments = await CommentModel.find({ post: postId }).populate("author", "name email");

    res.status(200).json({
      message: "Comments retrieved successfully",
      success: true,
      comments,
    });
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ message: "Unable to fetch comments", success: false });
  }
};

