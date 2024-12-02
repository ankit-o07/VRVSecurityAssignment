import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function GuestUser() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8081/");
        const data = await response.json();
        console.log(data)
        if (data.success) {
          setPosts(data.posts);
        } else {
          console.error(data.message || "Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="bg-white shadow-md p-4 mb-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Welcome, Guest!
        </h1>
        <p className="text-center mt-2">
          <Link
            to="/login"
            className="text-blue-500 font-semibold hover:underline"
          >
            Login
          </Link>{" "}
          to enhance your experience.
        </p>
      </header>

      <main className="max-w-4xl mx-auto">
        {loading ? (
          <p className="text-gray-500">Loading posts...</p>
        ) : posts.length > 0 ? (
          <section>
            <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
            <div className="grid grid-cols-1 gap-6">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-blue-500">{post.title}</h3>
                  <p className="text-gray-500 text-sm">
                    By {post.author} on{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 mt-2">{post.excerpt || "No excerpt available"}</p>
                  <Link
                    to={`/post/${post._id}`}
                    className="text-blue-500 mt-4 inline-block font-semibold hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <p className="text-gray-500">No posts available at the moment.</p>
        )}
      </main>

      <footer className="bg-white shadow-md mt-6 p-4 text-center">
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} BlogVerse. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default GuestUser;
