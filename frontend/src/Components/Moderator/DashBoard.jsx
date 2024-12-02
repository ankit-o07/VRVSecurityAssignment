import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../Helper/Utils.js";
import { ToastContainer } from "react-toastify";
import PostList from "./PostList.jsx";

const Post = () => {
  const user = localStorage.getItem("loggedInUser")
  const navigate = useNavigate();

  return (
    
    <div >
      <h1>Welcome {user}</h1>
      <PostList />

      <ToastContainer />
    </div>
  );
};

export default Post;
