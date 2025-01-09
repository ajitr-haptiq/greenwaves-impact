import React, { useState, useEffect, useRef, useCallback } from "react";
import NewsCard from "../components/NewsSlider/NewsCard";
import fetchNews from "../api/fetchNews"; // Import your fetchNews function from where it is located

const EnvironmentalNewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const observer = useRef();

  const loadNews = async (pageNumber, reset = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchNews(pageNumber); // Corrected here: use the imported `getNews` function
      setNews((prevNews) =>
        reset
          ? response.articles // Handle the articles correctly (no `data` object needed)
          : [...prevNews, ...response.articles]
      );
      setHasMore(response.articles.length > 0);
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Failed to load news. Please try again.");
    }
    setLoading(false);
  };

  // Fetch news when the component mounts
  useEffect(() => {
    loadNews(1); // Start from page 1
  }, []);

  // Infinite Scroll Logic
  const lastNewsElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadNews(news.length / 9 + 1); // Dynamically load the next page
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, news.length]
  );

  return (
    <div className="min-h-screen bg-green-300 px-4 py-12">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-800 my-8">
          Environmental News
        </h1>

        {error && <div className="text-center text-red-600 mb-8">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, index) => {
            if (news.length === index + 1) {
              return (
                <div
                  ref={lastNewsElementRef}
                  key={article.id || index}
                  className="relative"
                >
                  <NewsCard article={article} />
                </div>
              );
            }
            return (
              <div key={article.id || index} className="relative">
                <NewsCard article={article} />
              </div>
            );
          })}
        </div>

        {loading && (
          <div className="flex justify-center mt-8 space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse delay-100"></div>
            <div className="w-2.5 h-2.5 rounded-full  bg-blue-500 animate-pulse delay-200"></div>
            <div className="w-2.5 h-2.5 rounded-full  bg-blue-500 animate-pulse delay-300"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse delay-400"></div>
            <div className="w-2.5 h-2.5 rounded-full  bg-blue-500 animate-pulse delay-500"></div>
          </div>
        )}

        {!hasMore && !loading && (
          <div className="text-center mt-8 text-green-700">
            You've reached the end of the news.
          </div>
        )}
      </div>
    </div>
  );
};

export default EnvironmentalNewsPage;
