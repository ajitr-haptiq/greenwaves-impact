import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import { Link } from "react-router-dom";

const NewsSlider = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=pollution OR disaster OR waste OR global warming OR reforestation&page=${currentPage}&pageSize=9&apiKey=${apiKey}`
        );
        console.log("res", response.data.articles);

        setNews(response.data.articles);
        setTotalPages(Math.ceil(response.data.totalResults / 9));
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [currentPage, apiKey]);

  return (
    <div className="bg-white bg-opacity-0 backdrop-blur-md py-24 ">
      <div className="container mx-auto flex justify-between items-center ">
        <div className=" w-full  overflow-hidden m-2.5">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl text-white font-bold">
              Latest Environmental News
            </h2>
            <Link
              to="/environmentalnews"
              className="text-white font-bold hover:underline hover:text-black"
            >
              View All
            </Link>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
            {news.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSlider;
