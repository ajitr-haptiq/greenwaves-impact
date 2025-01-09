const fetchNews = async (pageNumber) => {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  try {
    const query =
      "pollution OR disaster OR waste OR global warming OR reforestation OR climate change OR environmental impact OR sustainability OR deforestation OR biodiversity OR ecosystem OR carbon footprint OR green energy OR renewable energy OR air quality OR water pollution OR plastic waste OR environmental justice OR conservation OR eco-friendly OR green initiatives OR ecological crisis OR natural resources";

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        query
      )}&page=${pageNumber}&pageSize=9&apiKey=${apiKey}&language=en`
    );

    const data = await response.json();

    if (!data || !data.articles) {
      throw new Error("Invalid response format or no articles found");
    }

    // Map and sanitize the articles
    const sanitizedArticles = data.articles.map((article) => ({
      ...article,
      title: article.title || "Untitled Article",
      description: article.description || "No description available.",
      category: article.category || "General",
      content: article.content || "Content unavailable.",
    }));

    return { ...data, articles: sanitizedArticles };
  } catch (error) {
    console.error("Error fetching news:", error);
    return { articles: [] }; // Return an empty array to avoid breaking the UI
  }
};

export default fetchNews;
