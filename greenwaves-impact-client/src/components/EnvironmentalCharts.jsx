// src/components/EnvironmentalCharts.jsx

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import fetchEnvironmentalData from "../api/fetchEnvironmentalData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const EnvironmentalCharts = () => {
  const [data, setData] = useState({
    globalWarming: [],
    pollution: [],
    waste: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const environmentalData = await fetchEnvironmentalData();
      if (environmentalData) {
        setData({
          globalWarming: environmentalData.globalWarming,
          pollution: environmentalData.pollution,
          waste: environmentalData.waste,
        });
      }
    };

    fetchData();
  }, []);

  const getChartData = (data) => {
    return {
      labels: data.map((item) => item.year),
      datasets: [
        {
          label: "Increase",
          data: data.map((item) => item.value),
          borderColor: "#34D399", // Tailwind green color
          backgroundColor: "rgba(52, 211, 153, 0.2)", // Light green for the chart area
          tension: 0.3,
        },
      ],
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-900 text-white py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">
        Environmental Issues Over the Years
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Global Warming Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Global Warming
          </h3>
          <Line
            data={getChartData(data.globalWarming)}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>

        {/* Air Pollution Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Air Pollution
          </h3>
          <Line
            data={getChartData(data.pollution)}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>

        {/* Waste Increase Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Waste Increase
          </h3>
          <Line
            data={getChartData(data.waste)}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalCharts;
