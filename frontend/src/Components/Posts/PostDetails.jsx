import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../Helper/Utils.js";
import { ToastContainer } from "react-toastify";

const PostDetails = () => {
  const [postData, setPostData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [owner, setOwner] = useState(false);
  const { id } = useParams(); // Retrieve post ID from route params
  const navigate = useNavigate();

  // Fetch post data and comments
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const url = `http://localhost:8081/api/user/post/${id}`;
        const response = await fetch(url, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const result = await response.json();
        if (result.success) {
          setPostData(result.post);

          // Check if the current user is the author
          if (result.owner) {
            setOwner(true);
          }
        } else {
          handleError(result.message || "Failed to fetch post data.");
        }
      } catch (err) {
        console.error("Error fetching post data:", err);
        handleError("An error occurred while fetching the post data.");
      }
    };

    const fetchComments = async () => {
      try {
        const url = `http://localhost:8081/api/user/post/${id}`;
        const response = await fetch(url, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const result = await response.json();
        if (result.success) {
          setComments(result.comments);
        } else {
          handleError(result.message || "Failed to fetch comments.");
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
        handleError("An error occurred while fetching comments.");
      }

      console.log(comments)
    };

    fetchPostData();
    fetchComments();
  }, [id]);

  // Add a new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) {
      handleError("Comment cannot be empty.");
      return;
    }

    try {
      const url = `http://localhost:8081/api/user/post/${id}/comment`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ content: newComment }),
      });

      const result = await response.json();
      if (result.success) {
        handleSuccess("Comment added successfully.");
        setComments((prevComments) => [...prevComments, result.comment]);
        setNewComment(""); // Clear the input field
      } else {
        handleError(result.message || "Failed to add comment.");
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      handleError("An error occurred while adding the comment.");
    }
  };

  return (
    <div className="flex items-center h-screen w-full">
      <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
        <span className="block w-full text-xl uppercase font-bold mb-4">
          Post Details
        </span>

        {postData ? (
          <>
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">{postData.title}</h2>
              <p className="text-sm text-gray-600">Category: {postData.category}</p>
              <p className="mt-4">{postData.content}</p>
              <p className="mt-4 text-sm text-gray-600">
                Tags: {postData.tags.join(", ")}
              </p>
            </div>
            {owner && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded mt-4"
                onClick={() => navigate(`/user/edit/${id}`)}
              >
                Edit Post
              </button>
            )}
            {/* <div className="mt-8">
              <h3 className="text-lg font-bold mb-2">Comments</h3>
              <ul className="space-y-2">
                {comments.map((comment) => (
                  <li
                    key={comment._id}
                    className="bg-gray-100 p-2 rounded shadow"
                  >
                    <p className="text-sm text-gray-600">
                      {comment.authorName || "Anonymous"}:
                    </p>
                    <p>{comment.content}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <textarea
                  className="w-full p-2 border rounded"
                  rows="3"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                ></textarea>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded mt-2"
                  onClick={handleAddComment}
                >
                  Add Comment
                </button>
              </div>
            </div> */}
          </>
        ) : (
          <p>Loading post details...</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PostDetails;
