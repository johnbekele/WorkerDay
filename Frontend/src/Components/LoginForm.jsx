import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; 
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";

const LoginForm = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [error, setError] = useState(""); // Store login errors

const handleChange = (e) => {
  setFormData((prevData) => {
    const updatedData = { ...prevData, [e.target.id]: e.target.value };
    
    return updatedData;
  });
};


const handleSubmit = async (e) => {
  e.preventDefault();
  setError(""); // Clear previous errors

  const loginData = {
    identifier: formData.identifier, // Rename 'email' to 'identifier'
    password: formData.password,
  };

  console.log("Submitting login form with data:", loginData);

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    console.log("Response received:", response);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Login failed:", errorData);
      setError(errorData.message || "Invalid credentials");
      return;
    }

    const data = await response.json();
    console.log("Login successful:", data);

    if (data.accessToken) {
      localStorage.setItem("token", data.accessToken);
    } else {
      console.error("No accessToken received from server");
      setError("Unexpected error. Please try again.");
      return;
    }

    setIsAuthenticated(true); // Ensure this function is passed as a prop

    // Redirect based on role
    console.log("User role:", data.role);
    switch (data.role) {
      case "Admin":
        navigate("/admin");
        break;
      case "Manager":
        navigate("/manager");
        break;
      default:
        navigate("/employee");
        break;
    }
  } catch (error) {
    console.error("Error during login:", error);
    setError("Server error. Please try again later.");
  }
};



  return (
    <div className="mx-auto w-full max-w-md rounded-none border border-gray-300 bg-white p-4 shadow dark:border-gray-800 dark:bg-black md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Wokerday
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to WorkeryDay . If you don't have an account, please register.
      </p>

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}

      <form className="my-8" onSubmit={handleSubmit}>
        
        <div className="mb-4 flex w-full flex-col space-y-2">
          <label
            htmlFor="identifier"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            identifier Address
          </label>
          <input
            id="identifier"
            placeholder="identifier"
            type="identifier"
            className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800"
            onChange={handleChange}
            value={formData.identifier}
            required
          />
        </div>
        <div className="mb-4 flex w-full flex-col space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            id="password"
            placeholder="password"
            type="password"
            className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800"
            onChange={handleChange}
            value={formData.password}
            required
          />
        </div>

        <button
          className="group relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900"
          type="submit"
        >
          Login &rarr;
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900"
            type="button"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              GitHub
            </span>
          </button>
          <button
            className="group relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};
LoginForm.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};
export default LoginForm;
