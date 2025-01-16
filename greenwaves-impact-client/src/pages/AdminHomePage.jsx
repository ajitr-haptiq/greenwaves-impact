import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminHomePage = () => {
  const [users, setUsers] = useState([]);
  const [campaignForm, setCampaignForm] = useState({
    title: "",
    description: "",
    image: null, // Store the image file
    location: "",
    goal: "",
  });
  const [message, setMessage] = useState(""); // For success/error messages
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4001/api/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setCampaignForm({ ...campaignForm, image: e.target.files[0] });
  };

  // Handle campaign form submission
  const handleCreateCampaign = async (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append("title", campaignForm.title);
    formData.append("description", campaignForm.description);
    formData.append("image", campaignForm.image); // Append the image file
    formData.append("location", campaignForm.location);
    formData.append("goal", campaignForm.goal);

    try {
      // Send a POST request with FormData
      const response = await axios.post(
        "http://localhost:4001/api/admin/campaigns", // Correct endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type for file upload
          },
        }
      );

      // Set success message
      setMessage("Campaign created successfully!");
      setMessageType("success");

      // Clear the form
      setCampaignForm({
        title: "",
        description: "",
        image: null,
        location: "",
        goal: "",
      });

      // Clear the message after 3 seconds
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch (error) {
      // Set error message
      setMessage("Failed to create campaign. Please try again.");
      setMessageType("error");

      // Clear the message after 3 seconds
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-[calc(100vh-68px)] pt-[100px] min-h-screen bg-gradient-to-b from-green-300 to-green-400">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Admin Dashboard
        </h1>

        {/* Display success/error message */}
        {message && (
          <div
            className={`p-4 mb-4 rounded-md text-center ${
              messageType === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {message}
          </div>
        )}

        {/* Users Table */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            All Users
          </h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left">Username</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className="p-3">{user.username}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Campaign Form */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Create Campaign
          </h2>
          <form
            onSubmit={handleCreateCampaign}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={campaignForm.title}
                onChange={(e) =>
                  setCampaignForm({ ...campaignForm, title: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              <textarea
                placeholder="Description"
                value={campaignForm.description}
                onChange={(e) =>
                  setCampaignForm({
                    ...campaignForm,
                    description: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={campaignForm.location}
                onChange={(e) =>
                  setCampaignForm({ ...campaignForm, location: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="number"
                placeholder="Goal (in INR)"
                value={campaignForm.goal}
                onChange={(e) =>
                  setCampaignForm({ ...campaignForm, goal: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
              >
                Create Campaign
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
