import React from "react";
import { useNavigate } from "react-router-dom";

const ActionButtons = ({ title, description }) => {
  const lowerTitle = title.toLowerCase() + description.toLowerCase();
  const navigate = useNavigate(); // Hook for navigation

  const actions = [
    {
      keywords: [
        "global warming",
        "warming",
        "climate crisis",
        "climate change",
        "extreme weather",
        "temperature rise",
      ],
      label: "Plant Trees",
      color: "bg-green-500",
      path: "/plant-trees", // Path for this action
    },
    {
      keywords: [
        "carbon emissions",
        "carbon footprint",
        "air pollution",
        "greenhouse gases",
        "CO2 emissions",
        "climate emissions",
      ],
      label: "Carbon Tracker",
      color: "bg-blue-500",
      path: "/carbon-tracker", // Path for this action
    },
    {
      keywords: [
        "plastic waste",
        "local pollution",
        "clean up",
        "water pollution",
        "pollution",
        "recycling",
        "plastic pollution",
        "single-use plastics",
        "plastic bottles",
        "landfills",
        "waste recycling",
        "waste reduction",
        "recyclable materials",
        "zero waste",
        "waste",
        "garbage",
        "trash",
        "waste management",
      ],
      label: "Manage Waste",
      color: "bg-yellow-500",
      path: "/waste-management", // Path for Waste Management Page
    },
    {
      keywords: [
        "disaster",
        "natural disaster",
        "flood",
        "earthquake",
        "tsunami",
      ],
      label: "Donate",
      color: "bg-red-500",
      path: "/donate", // Path for this action
    },
    {
      keywords: [
        "reforestation",
        "tree planting",
        "forest restoration",
        "green cover",
      ],
      label: "Donate",
      color: "bg-red-500",
      path: "/donate", // Path for this action
    },
    {
      keywords: [
        "reforestation",
        "tree planting",
        "forest restoration",
        "green cover",
      ],
      label: "Plant Trees",
      color: "bg-green-600",
      path: "/plant-trees", // Path for this action
    },
    {
      keywords: ["wildfire", "forest fire", "wildfires", "fire hazard"],
      label: "Donate",
      color: "bg-red-500",
      path: "/donate", // Path for this action
    },
    {
      keywords: [
        "eco-friendly",
        "sustainability",
        "green living",
        "environmental protection",
        "save nature",
      ],
      label: "Donate",
      color: "bg-red-500",
      path: "/donate", // Path for this action
    },
  ];

  const matchingActions = actions.filter((action) =>
    action.keywords.some((keyword) => lowerTitle.includes(keyword))
  );

  const handleButtonClick = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <div className="flex gap-2 mt-4">
      {matchingActions.length > 0 ? (
        matchingActions.map((action, index) => (
          <button
            key={index}
            className={`${action.color} hover:opacity-80 text-white px-4 py-2 rounded transition`}
            onClick={() => handleButtonClick(action.path)} // Navigate on click
          >
            {action.label}
          </button>
        ))
      ) : (
        <span className="text-gray-500 italic">
          Stay informed and take action
        </span>
      )}
    </div>
  );
};

export default ActionButtons;
