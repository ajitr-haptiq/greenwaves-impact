import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulating login state
  const [isTakeActionOpen, setIsTakeActionOpen] = useState(false); // To control Take Action dropdown
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    // Close the dropdown if the click is outside of the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsTakeActionOpen(false);
    }
  };

  const controlNavbar = useCallback(() => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [lastScrollY, controlNavbar]);

  return (
    <div className="">
      <nav
        className={` bg-black bg-opacity-0 backdrop-blur-md p-4 shadow-lg fixed w-full z-10 top-0 left-0 transition-transform duration-300  ${
          isScrollingUp ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          // backgroundImage: "url('/images/navB2.jpg')",  // Your background image
          backgroundSize: "cover", // Make the image cover the entire navbar area
          backgroundPosition: "top", // Position the background image at the top
        }}
      >
        <div className="container mx-auto flex justify-between items-center pb-1">
          <div className="text-2xl font-bold text-white">
            <Link to="/" className="hover:text-black transition duration-300">
              EcoPlatform
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            {[
              "Home",
              "Environmental News",
              "Charts",
              "Campaigns",
              "About Us",
              "Contact",
            ].map((item, index) => (
              <Link
                key={index}
                to={
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "")}`
                }
                className="text-white border-b-2 border-transparent hover:border-darkGreen transition duration-300"
              >
                {item}
              </Link>
            ))}

            {/* Take Action Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsTakeActionOpen(!isTakeActionOpen)}
                className="text-white border-b-2 border-transparent hover:border-darkGreen transition duration-300"
              >
                Take Action
              </button>
              {isTakeActionOpen && (
                <div className="text-darkGreen absolute text-center shadow-lg mt-2 p-4 rounded-lg space-y-2 bg-black bg-opacity-30 w-[150px] ">
                  <Link
                    to="/fundraising"
                    className="block text-white transition duration-300 border-b-2 border-transparent hover:border-darkGreen"
                  >
                    Tree Fund
                  </Link>
                  <Link
                    to="/carbon-footprint-tracker"
                    className="block text-white transition duration-300 border-b-2 border-transparent hover:border-darkGreen"
                  >
                    Carbon Tracker
                  </Link>
                  <Link
                    to="/waste-management"
                    className="block text-white hover:border-darkGreen transition duration-300 border-b-2 border-transparent"
                  >
                    Waste AI
                  </Link>
                  <Link
                    to="/disaster-prediction"
                    className="block text-white hover:border-darkGreen transition duration-300 border-b-2 border-transparent"
                  >
                    Risk Alert
                  </Link>
                </div>
              )}
            </div>

            {/* Conditional Rendering Based on Login State */}
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white border-b-2 border-transparent hover:border-darkGreen transition duration-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-white hover:text-red-500 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white border-b-2 border-transparent hover:border-darkGreen transition duration-300"
                >
                  Login
                </Link>
                {/* <Link
                  to="/register"
                  className="text-white border-b-2 border-transparent hover:border-darkGreen transition duration-300"
                >
                  Register
                </Link> */}
              </>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-black focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white bg-opacity-70 backdrop-blur-md p-4 space-y-4 shadow-lg mt-2 rounded-lg">
            {[
              "Home",
              "Environmental News",
              "Charts",
              "About Us",
              "Contact",
            ].map((item, index) => (
              <Link
                key={index}
                to={`/${item.toLowerCase().replace(" ", "")}`}
                className="block text-black border-b-2 border-transparent hover:border-darkGreen transition duration-300"
              >
                {item}
              </Link>
            ))}

            {/* Take Action Dropdown for Mobile */}
            <div className="relative">
              <button
                onClick={() => setIsTakeActionOpen(!isTakeActionOpen)}
                className="block text-black border-b-2 border-transparent hover:border-darkGreen transition duration-300"
              >
                Take Action
              </button>
              {isTakeActionOpen && (
                <div className="absolute bg-white shadow-lg mt-2 p-4 rounded-lg space-y-2">
                  <Link
                    to="/fundraising"
                    className="block text-black hover:border-darkGreen transition duration-300"
                  >
                    Tree Fund
                  </Link>
                  <Link
                    to="/carbon-footprint-tracker"
                    className="block text-black hover:border-darkGreen transition duration-300"
                  >
                    Carbon Tracker
                  </Link>

                  <Link
                    to="/ai-waste-management"
                    className="block text-black hover:border-darkGreen transition duration-300"
                  >
                    Waste AI
                  </Link>
                  <Link
                    to="/disaster-prediction"
                    className="block text-black hover:border-darkGreen transition duration-300"
                  >
                    Risk Alert
                  </Link>
                </div>
              )}
            </div>

            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="block text-black hover:border-darkGreen"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="block text-black hover:text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-black hover:border-darkGreen"
                >
                  Login
                </Link>
                {/* <Link
                  to="/register"
                  className="block text-black hover:border-darkGreen"
                >
                  Register
                </Link> */}
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
