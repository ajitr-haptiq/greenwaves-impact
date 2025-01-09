import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CampaignDetail = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    const fetchCampaignDetail = async () => {
      try {
        const response = await fetch(`/api/campaigns/${id}`); // Replace with actual endpoint
        const data = await response.json();
        setCampaign(data);
      } catch (error) {
        console.error("Error fetching campaign details:", error);
      }
    };
    fetchCampaignDetail();
  }, [id]);

  if (!campaign) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            {campaign.title}
          </h1>
          <p className="text-gray-600 mb-6">
            {campaign.date} | {campaign.time}
          </p>
          <p className="text-gray-800 leading-relaxed">
            {campaign.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
