import React from "react";

const ReuseSuggestions = ({ suggestions }) => {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Reuse Suggestions</h2>
      <p className="text-gray-700">{suggestions}</p>
    </div>
  );
};

export default ReuseSuggestions;
