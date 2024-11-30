import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify" 
import { handleError, handleSuccess } from "../Helper/Utils";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleInputChange =  (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async(e) => {
    e.preventDefault(); 
    const { name, email, password, confirmPassword } = formData;

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required.");
      return;
    }
    // Confirm Password check
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // API Call for Registration
    try{
        const url = "http://localhost:8081/api/auth/register"
        const requestData = { name, email, password };
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(requestData)
        });
        
        const result = await response.json();
        const {success , error,message} = result;

        if(success){
            handleSuccess(message);
            setTimeout(()=>{
                navigate("/login")
            },1000)
            console.log("test 4")
        }else if(error){
            console.log("Error" , error)
            const details = error?.details[0].message;
            
            handleError(details)
        }else if(!success){
            handleError(message);
        }
    }
    catch(err){
        handleError(err);
    }

    
  };

  return (
    <>
      <div className="flex items-center h-screen w-full">
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <span className="block w-full text-xl uppercase font-bold mb-4">Register</span>
          <form className="mb-4" onSubmit={handleRegister}>
            <div className="mb-4 md:w-full">
              <label htmlFor="name" className="block text-xs mb-1">Full Name</label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 md:w-full">
              <label htmlFor="email" className="block text-xs mb-1">Email</label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 md:w-full">
              <label htmlFor="password" className="block text-xs mb-1">Password</label>
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
            <div className="mb-6 md:w-full">
              <label htmlFor="confirmPassword" className="block text-xs mb-1">Confirm Password</label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded w-full mb-4"
            >
              Register
            </button>
          </form>
          <div className="text-center mb-4">
            <button
              className="bg-red-500 hover:bg-red-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded w-full flex items-center justify-center"
              onClick={() => {
                alert("Register with Gmail clicked!");
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
                  d="M43.8 20.3H42V20H24v8h11.3C33.6 32.5 29.2 36 24 36c-6.4 0-11.7-4.5-13.4-10.5l-7 5.5C7.3 37.5 14.8 44 24 44z"
                />
                <path
                  fill="#34A853"
                  d="M10.6 24c0-1.5.3-3 .8-4.3L3.4 14C1.6 17.6 0 21.7 0 26s1.6 8.4 4.4 11.5l7-5.5c-.5-1.4-.8-2.8-.8-4.3z"
                />
              </svg>
              Register with Gmail
            </button>
          </div>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <a className="text-blue-700" href="/login">
              Login
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
