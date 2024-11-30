import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the schema for the Comment model
const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Comment model
const CommentModel = mongoose.model("Comment", commentSchema);

// Export the model
export { CommentModel };
