import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Form validation state
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validate = () => {
    const newErrors = {};
    if (!form.username) newErrors.username = "Username is required.";
    if (!form.email) newErrors.email = "Email is required.";
    if (!form.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validate()) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    try {
      // Send a POST request to the backend
      const response = await axios.post(
        "http://localhost:4001/api/auth/register",
        form
      );

      // Handle successful registration
      setMessage("Registration successful!");
      setMessageType("success");

      // Redirect to the login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (error) {
      // Handle registration error
      setMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      setMessageType("error");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url(/images/registerbackground.jpg)",
      }}
    >
      <div className="bg-white bg-opacity-30 p-8 rounded-lg shadow-lg w-full max-w-md backdrop-blur-md">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-6">
          Create an Account
        </h1>
        <p className="text-center text-gray-200 mb-6">
          Join us in making a difference for the planet!
        </p>

        {message && (
          <div
            className={`p-3 mb-4 rounded-md text-center ${
              messageType === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {message}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleRegister}>
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-opacity-50 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.username && (
              <p className="text-red-600 text-sm">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-opacity-50 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-opacity-50 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              name="role"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-opacity-50 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="user" style={{ opacity: 0.1 }}>
                User
              </option>
              <option value="admin" style={{ opacity: 0.1 }}>
                Admin
              </option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Link to Login page */}
        <p className="text-center text-gray-200 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-green-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
