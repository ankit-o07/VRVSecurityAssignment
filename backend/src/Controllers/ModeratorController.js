import { PostModel } from "../Models/PostModel.js";
import { CommentModel } from "../Models/CommentModel.js";

// Moderate a post (Approve/Reject)
export const moderatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    const post = await PostModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json({
            message: `Post has been successfully ${status.toLowerCase()}.`,
            success: true,
            post,
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to moderate post." });
  }
};

// Moderate a comment (Approve/Reject)
export const moderateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    const comment = await CommentModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    res.status(200).json({ comment });
  } catch (error) {
    res.status(500).json({ message: "Unable to moderate comment." });
  }
};

// // Function to moderate a post by updating its status to "Approved" or "Rejected"
// export const moderatePostReviwe = async (req, res)=>{
//   try {
//     const { id } = req.params; 
//     const { status } = req.body; 

//     // Validate status input
//     if (!["Approved", "Rejected"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status. Allowed values are 'Approved' or 'Rejected'.", success: false });
//     }

//     // Find and update the post's status
//     const post = await PostModel.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true } // Return the updated document
//     );

//     // If the post is not found, return a 404 error
//     if (!post) {
//       return res.status(404).json({ message: "Post not found.", success: false });
//     }

//     // Respond with success and the updated post
//     res.status(200).json({
//       message: `Post has been successfully ${status.toLowerCase()}.`,
//       success: true,
//       post,
//     });
//   } catch (error) {
//     console.error("Error moderating post:", error);
//     res.status(500).json({ message: "Unable to moderate post review.", success: false });
//   }
  
// }