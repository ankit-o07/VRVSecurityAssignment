import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = "http://localhost:8081/api/user/posts";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const data = await response.json();
        if (data.success) {
          setPosts(data.posts);
          setFilteredPosts(data.posts); // Initialize filteredPosts
        } else {
          console.error(data.message || "Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    const results = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(results);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="bg-white shadow-md p-4 mb-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">Post List</h1>
        <p className="text-center text-gray-600 mt-2">
          Browse and manage all your posts in one place.
        </p>
      </header>

      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border rounded p-2 outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto">
        <section>
          <h2 className="text-2xl font-bold mb-4">Your Posts</h2>
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post._id} // Use _id for unique keys
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-blue-500">{post.title}</h3>
                  <p className="text-gray-500 text-sm">
                    Role: {post.role} | Status:{" "}
                    <span
                      className={`font-semibold ${
                        post.status === "active" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {post.status}
                    </span>
                  </p>
                  <Link to={`/user/post/${post._id}`} className="text-blue-500 mt-4 inline-block font-semibold hover:underline">
                    View details →
                    </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No posts found matching your search.</p>
          )}
        </section>
      </main>

      <footer className="bg-white shadow-md mt-6 p-4 text-center">
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} YourAppName. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default PostList;
