import React from "react";

const Home = () => {
  return (
    <div
      className="w-full h-screen" // full width and screen height
      style={{
        backgroundImage: "url(/images/registerbackground.jpg)",
        backgroundSize: "cover", // Ensure the image covers the entire area
        backgroundPosition: "center", // Center the image
        backgroundAttachment: "fixed", // Optional: Keeps the background fixed while scrolling
      }}
    >
      <div className="flex items-center justify-center h-full">
        <h1 className="text-white text-4xl font-bold">
          Welcome to EcoPlatform
        </h1>
      </div>
    </div>
  );
};

export default Home;
