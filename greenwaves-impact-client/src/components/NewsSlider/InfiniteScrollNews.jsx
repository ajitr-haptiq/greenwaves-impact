import { useState, useEffect } from "react";
import axios from "axios";

const InfiniteScrollNews = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadMoreNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=pollution OR disaster&page=${page}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        );
        setNews((prevNews) => [...prevNews, ...response.data.articles]);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    loadMoreNews();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1); // Increment the page number when scroll reaches bottom
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {news.map((article, index) => (
        <div
          key={index}
          className="bg-white shadow-lg hover:shadow-xl rounded-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img
            src={article.urlToImage || "https://via.placeholder.com/150"}
            alt={article.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {article.description
                ? article.description.slice(0, 100) + "..."
                : "Click to read more"}
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Read Full Article
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfiniteScrollNews;
