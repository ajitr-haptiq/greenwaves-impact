import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = ({ userId }) => {
  const [treesPlanted, setTreesPlanted] = useState(0);

  // Fetch user's trees planted
  useEffect(() => {
    const fetchTreesPlanted = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/api/user/trees-planted/${userId}`
        );
        setTreesPlanted(response.data.totalTreesPlanted);
      } catch (error) {
        console.error("Failed to fetch trees planted:", error);
      }
    };

    fetchTreesPlanted();
  }, [userId]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        Your Contribution
      </h2>
      <p className="text-lg text-gray-600">
        You have planted <strong>{treesPlanted}</strong> trees so far!
      </p>
    </div>
  );
};

export default UserProfile;
