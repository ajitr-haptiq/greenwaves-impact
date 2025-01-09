import React from "react";
import ActionButtons from "./ActionButtons";
import { Link } from "react-router-dom";

const NewsCard = ({ article }) => {
  const { title, description, urlToImage, url, id } = article;

  return (
    <div className="bg-white bg-opacity-50 shadow-lg hover:shadow-xl rounded-lg overflow-hidden transition-transform transform hover:scale-105 relative h-full">
      <img
        src={urlToImage || "https://via.placeholder.com/150"}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-2 ">{title}</h2>
        <p className="text-sm text-gray-800 mb-4">
          {description
            ? description.slice(0, 100) + "..."
            : "Click to read more"}
        </p>
        <ActionButtons title={title} description={description} />
        <Link
          to={`/news-details/${id}`}
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Read Full Article
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
