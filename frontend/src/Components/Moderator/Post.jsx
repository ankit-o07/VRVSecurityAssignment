import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../Helper/Utils.js";
import { ToastContainer } from "react-toastify";

const Post = () => {
  const [postData, setPostData] = useState(null);
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

    fetchPostData();
  }, [id]);

  // Handle Approve/Reject actions
  const handleModeration = async (status) => {
    try {
      const url = `http://localhost:8081/api/moderate/post/${id}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();
      if (result.success) {
        handleSuccess(`Post successfully ${status.toLowerCase()}!`);
        navigate("/admin/posts"); // Redirect to the admin post list page
      } else {
        handleError(result.message || `Failed to ${status.toLowerCase()} post.`);
      }
    } catch (err) {
      console.error(`Error during ${status.toLowerCase()} post:`, err);
      handleError(`An error occurred while trying to ${status.toLowerCase()} the post.`);
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

            {/* Approve and Reject Buttons */}
            {!owner && (
              <div className="flex gap-4 mt-4">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
                  onClick={() => handleModeration("Approved")}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
                  onClick={() => handleModeration("Rejected")}
                >
                  Reject
                </button>
              </div>
            )}
          </>
        ) : (
          <p>Loading post details...</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Post;
