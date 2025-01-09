import React, { useState, useEffect } from "react";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=YOUR_API_KEY&locale=*&size=9`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCampaigns(data._embedded.events);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-4xl font-bold text-center mb-10 text-green-700">
        Upcoming Campaigns
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
            onClick={() => window.open(campaign.url, "_blank")}
          >
            <img
              src={campaign.images[0].url}
              alt={campaign.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2 text-green-600 hover:underline">
                {campaign.name}
              </h3>
              <p className="text-gray-600">
                {new Date(campaign.dates.start.dateTime).toLocaleString()}
              </p>
              <p className="text-gray-700 mt-4">
                {campaign.info || "No description available."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
