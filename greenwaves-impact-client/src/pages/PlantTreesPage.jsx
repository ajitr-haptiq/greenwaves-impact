import React, { useEffect, useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js"; // Import Elements provider
import { loadStripe } from "@stripe/stripe-js"; // Import loadStripe
import StripePaymentModal from "../components/StripePaymentModal"; // Import StripePaymentModal

// Load your Stripe publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PlantTreesPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Fetch all campaigns
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/campaigns");
        const campaignsWithDefaults = response.data.map((campaign) => ({
          ...campaign,
          raised: Number(campaign.raised) || 0, // Ensure raised is a number
          goal: Number(campaign.goal) || 80000, // Ensure goal is a number
        }));
        setCampaigns(campaignsWithDefaults);
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      }
    };

    fetchCampaigns(); // Fetch campaigns on component mount
  }, []);

  // Handle donation success
  const handleDonationSuccess = (amount, campaignId) => {
    setCampaigns((prevCampaigns) =>
      prevCampaigns.map((campaign) =>
        campaign._id === campaignId
          ? { ...campaign, raised: campaign.raised + amount * 100 } // Add amount in paise
          : campaign
      )
    );
    setSelectedCampaign(null); // Close the modal after successful donation
  };

  return (
    <div className="min-h-screen bg-green-300">
      {/* Hero Section */}
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center text-center py-20 bg-green-300 text-green-800">
          <h1 className="text-5xl font-bold mb-6">Plant Trees</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Trees are essential for our planet. They provide oxygen, improve air
            quality, conserve water, and support wildlife. Join us in making a
            difference by planting trees and restoring our environment.
          </p>
        </div>

        {/* Deforestation Awareness Section */}
        <div className="p-6 bg-green-300 text-green-800">
          <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
            Deforestation Awareness
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/3hxE7Af98AI"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/Ic-J6hcSKa8"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Ecosia Section */}
        <div className="p-6 bg-green-300 text-green-800">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Use Ecosia to Plant Trees
          </h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg mb-4">
              Ecosia is a search engine that uses its revenue to plant trees. By
              using Ecosia, you can contribute to reforestation efforts around
              the world. Every search helps plant a tree!
            </p>
            <a
              href="https://www.ecosia.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-green-700 px-6 py-2 rounded-full font-semibold hover:bg-green-100 transition duration-300"
            >
              Visit Ecosia
            </a>
          </div>

          {/* Ecosia Video Links */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/oNWJv0LR07M" // No autoplay, no loop
                title="YouTube video player"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/uwufRbQZve8" // Embed URL
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Our Campaigns Section */}
      <div className="p-6 bg-gradient-to-b from-green-200 to-green-400">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
            Our Campaigns
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div
                key={campaign._id}
                className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={`http://localhost:4001/${campaign.image}`} // Correct image URL
                  alt={campaign.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-green-700">
                    {campaign.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{campaign.description}</p>
                  <p className="text-gray-600 mt-2">
                    <strong>Location:</strong> {campaign.location}
                  </p>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${(campaign.raised / campaign.goal) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Raised: ₹{campaign.raised / 100} / ₹{campaign.goal / 100}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCampaign(campaign._id)}
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
                  >
                    Donate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stripe Payment Modal */}
      {selectedCampaign && (
        <Elements stripe={stripePromise}>
          <StripePaymentModal
            amount={100} // Minimum donation amount: ₹100
            onSuccess={(amount) =>
              handleDonationSuccess(amount, selectedCampaign)
            }
            onClose={() => setSelectedCampaign(null)}
          />
        </Elements>
      )}
    </div>
  );
};

export default PlantTreesPage;
