import React, { useState, useEffect } from "react";
import { handleSuccess, handleError } from "../../Helper/Utils";

function PostList() {
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8081/");
        const result = await response.json();

        if (result.success) {
          // Filter posts with status "Pending" and format date
          const pendingPosts = result.posts
            .filter((post) => post.status === "Pending")
            .map((post) => ({
              ...post,
              date: new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
            }));
          setFilteredBlogs(pendingPosts);
        } else {
          console.error("Failed to fetch posts:", result.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleModeration = async (postId, status) => {
    try {
      const response = await fetch(`http://localhost:8081/api/moderator/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();
      if (result.success) {
        handleSuccess(`Post successfully ${status.toLowerCase()}!`)
        // Update the local state to remove the moderated post
        setFilteredBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== postId));
      } else {
        console.error(`Failed to ${status.toLowerCase()} post:`, result.message);
      }
    } catch (error) {
      console.error(`Error during ${status.toLowerCase()} post:`, error);
      const details = error?.details[0].message;
      handleError(details)
    }
  };

  return (
    <div>
      <main className="max-w-4xl mx-auto">
        <section>
          <h2 className="text-2xl font-bold mb-4">Pending Blogs</h2>

          {loading ? (
            <p className="text-gray-500">Loading posts...</p>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-blue-500">{blog.title}</h3>
                  <p className="text-gray-500 text-sm">
                    By Ankit on {blog.date}
                  </p>
                  <p className="text-gray-700 mt-2">{blog.content}</p>
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={() => handleModeration(blog._id, "Approved")}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleModeration(blog._id, "Rejected")}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No pending blogs found.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default PostList;
