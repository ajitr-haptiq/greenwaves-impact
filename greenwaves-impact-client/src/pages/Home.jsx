import React from "react";
import Slider from "../components/Slider/Slider";
import NewsSlider from "../components/NewsSlider/NewsSlider";
import EnvironmentalCharts from "../components/EnvironmentalCharts";
import Campaigns from "../components/Campaigns";

const Home = () => {
  return (
    <main
      className="flex flex-col w-full" // Full viewport height
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/registerbackground.jpg')",
        backgroundSize: "cover", // Ensures the image covers the full div
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Keeps background static while scrolling
      }}
    >
      <Slider />
      <NewsSlider />
      {/* <EnvironmentalCharts /> */}
      {/* <Campaigns /> */}
    </main>
  );
};

export default Home;
