import React, { useState, useEffect } from "react";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      text: "One Earth, One Chance – Act Now!",
      subtext:
        "Your actions today craft the legacy of tomorrow. Join the movement for a sustainable future.",
      img: "/images/slide1.jpg",
    },
    {
      text: "Plant Hope, Grow Change",
      subtext:
        "Every tree planted is a breath for the planet. Together, let’s cultivate a greener tomorrow.",
      img: "/images/slide2.jpg",
    },
    {
      text: "Reimagine Waste – Recycle the Future",
      subtext:
        "Don’t let waste define our world. Transform it into resources and drive innovation.",
      img: "/images/slide3.jpg",
    },
    {
      text: "Prepare Today, Prevent Disaster Tomorrow",
      subtext:
        "Predicting and preventing environmental disasters – because safety starts with awareness.",
      img: "/images/slide4.jpg",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative z-1 mt-[69px] w-full h-[600px] overflow-hidden">
      {/* Left Button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full"
      >
        &#60;
      </button>

      {/* Right Button */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full"
      >
        &#62;
      </button>

      <div
        className="flex flex-col transition-transform ease-in-out duration-[4000ms]"
        style={{
          transform: `translateY(-${currentIndex * 600}px)`, // Slide up one at a time
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0"
            style={{
              backgroundImage: `url(${slide.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "600px", // Set height for each slide
            }}
          >
            <div className="flex flex-col items-center justify-center h-full bg-black/50 text-white">
              <h1 className="text-[60px] font-bold">{slide.text}</h1>
              <p className="mt-4 text-[24px]">{slide.subtext}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 w-full h-[7px]">
        <div
          className="bg-white/25 transition-all"
          style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Slider;
