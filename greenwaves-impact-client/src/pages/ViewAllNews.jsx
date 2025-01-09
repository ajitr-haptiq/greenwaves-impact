import React from "react";
import InfiniteScrollNews from "../components/NewsSlider/InfiniteScrollNews";
const ViewAllNews = () => {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">All Environmental News</h2>

      {/* Infinite Scroll News Component */}
      <InfiniteScrollNews />
    </div>
  );
};

export default ViewAllNews;
