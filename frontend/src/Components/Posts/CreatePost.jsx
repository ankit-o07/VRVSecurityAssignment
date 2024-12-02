import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../Helper/Utils.js";
import { ToastContainer } from "react-toastify";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  });

  const navigate = useNavigate();

  // Bind data with form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle post submission
  const handleSubmitPost = async (e) => {
    e.preventDefault();
    const { title, content, category, tags } = formData;

    // Basic validation
    if (!title || !content || !category) {
      alert("Title, Content, and Category are required.");
      return;
    }

    // Format tags into an array
    const formattedTags = tags.split(",").map((tag) => tag.trim());

    // API Call for creating a post
    try {
      const url = "http://localhost:8081/api/user/posts";
      console.log(localStorage.getItem("token"))
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ ...formData, tags: formattedTags }),
      });
      console.log(formData)
      const result = await response.json();
      const { success, error, message } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/home"); // Redirect after successful post creation
        }, 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        handleError(details || "An error occurred.");
      } else {
        handleError(message || "An error occurred.");
      }
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  return (
    <>
      <div className="flex items-center h-screen w-full">
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <span className="block w-full text-xl uppercase font-bold mb-4">
            Create Post
          </span>
          <form className="mb-4" onSubmit={handleSubmitPost}>
            <div className="mb-4 md:w-full">
              <label htmlFor="title" className="block text-xs mb-1">
                Title
              </label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="text"
                name="title"
                id="title"
                placeholder="Enter post title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4 md:w-full">
              <label htmlFor="content" className="block text-xs mb-1">
                Content
              </label>
              <textarea
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                name="content"
                id="content"
                placeholder="Write your post content here..."
                value={formData.content}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4 md:w-full">
              <label htmlFor="category" className="block text-xs mb-1">
                Category
              </label>
              <select
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                name="category"
                id="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div className="mb-6 md:w-full">
              <label htmlFor="tags" className="block text-xs mb-1">
                Tags
              </label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="text"
                name="tags"
                id="tags"
                placeholder="Enter tags separated by commas (e.g., react, coding)"
                value={formData.tags}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded w-full mb-4"
            >
              Submit Post
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreatePost;
