import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { handleError, handleSuccess } from "../Helper/Utils";
import { ToastContainer } from "react-toastify" 


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // bind data with form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //handle login
  const handleLogin =async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Basic validation
    if (!email || !password) {
      alert("Both fields are required.");
      return;
    }
    //API Call for login
    try{
        const url = "http://localhost:8081/api/auth/login"
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(formData)
            
        });
        const result = await response.json();
        const {success , error,message, token , name } = result;
        console.log(result);
        if(success){
            handleSuccess(message);
            localStorage.setItem("token",token, );
            localStorage.setItem("loggedInUser", name);
            setTimeout(()=>{
                navigate("/home")
            },1000)
        }else if(error){
            const details = error?.details[0].message;
            handleError(details)
        }else if(!success){
            handleError(message);
        }
    }catch(err){

    }


  };

  return (
    <>
      <div className="flex items-center h-screen w-full">
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <span className="block w-full text-xl uppercase font-bold mb-4">
            Login
          </span>
          <form className="mb-4" onSubmit={handleLogin}>
            <div className="mb-4 md:w-full">
              <label htmlFor="email" className="block text-xs mb-1">
                Username or Email
              </label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="email"
                name="email"
                id="email"
                placeholder="Username or Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6 md:w-full">
              <label htmlFor="password" className="block text-xs mb-1">
                Password
              </label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded w-full mb-4"
            >
              Login
            </button>
          </form>
          <div className="text-center mb-4">
            <button
              className="bg-red-200 hover:bg-red-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded w-full flex items-center justify-center"
              onClick={() => {
                alert("Login with Gmail clicked!");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.1 0 5.9 1.1 8.1 2.9l6-6C34.6 3 29.6 1 24 1 14.8 1 6.9 6.4 3.4 14l7 5.5C12.3 13 17.6 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M24 44c5.4 0 10-1.8 13.7-4.8l-7-5.5C28.3 36.5 26.2 37 24 37c-6.4 0-11.7-4.5-13.4-10.5l-7 5.5C6.9 39.6 14.8 44 24 44z"
                />
                <path
                  fill="#FBBC05"
                  d="M43.8 20.3H42V20H24v8h11.3C33.6 32.5 29.2 36 24 36c-6.4 0-11.7-4.5-13.4-10.5l-7 5.5C7.3 37.5 14.8 44 24 44c9.2 0 17-5.9 19.8-14.2L43.8 20.3z"
                />
                <path
                  fill="#34A853"
                  d="M10.6 24c0-1.5.3-3 .8-4.3L3.4 14C1.6 17.6 0 21.7 0 26s1.6 8.4 4.4 11.5l7-5.5c-.5-1.4-.8-2.8-.8-4.3z"
                />
              </svg>
              Login with Gmail
            </button>
          </div>
          <a className="text-blue-700 text-center text-sm" href="/login">
            Forgot password?
          </a>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
