import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ActionButtons from "../components/NewsSlider/ActionButtons";
import { useEffect, useState } from "react";

const NewsDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = process.env.REACT_APP_NEWS_API_KEY;
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${id}&apiKey=${apiKey}`
        );
        setArticle(response.data.articles[0]);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto my-8 p-4 bg-white rounded-lg shadow-md">
      <img
        src={article.urlToImage}
        alt={article.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h2 className="text-2xl font-semibold mb-4">{article.title}</h2>
      <p className="text-gray-700">{article.content}</p>
      <ActionButtons title={article.title} description={article.description} />
    </div>
  );
};

export default NewsDetails;
