import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  const { isLoggedIn, logout } = useAuth();
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulating login state

  const [isTakeActionOpen, setIsTakeActionOpen] = useState(false); // To control Take Action dropdown
  const dropdownRef = useRef(null);

  // Handle click outside the dropdown
  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsTakeActionOpen(false);
    }
  }, []);

  // Control navbar visibility on scroll
  const controlNavbar = useCallback(() => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      setIsScrollingUp(false); // Hide navbar when scrolling down
    } else {
      setIsScrollingUp(true); // Show navbar when scrolling up
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
  }, [controlNavbar, handleClickOutside]);

  // Navbar links for desktop and mobile
  const navLinks = [
    "Home",
    "Environmental News",
    // "Charts",
    // "Campaigns",
    // "About Us",
    // "Contact",
  ];

  // Take Action dropdown links
  const takeActionLinks = [
    { to: "/plant-trees", text: "Plant Trees" },
    { to: "/carbon-footprint-tracker", text: "Carbon Tracker" },
    { to: "/waste-management", text: "Waste AI" },
  ];

  return (
    <div>
      <nav
        className={`bg-black bg-opacity-0 backdrop-blur-md p-4 shadow-lg fixed w-full z-10 top-0 left-0 transition-transform duration-300 ${
          isScrollingUp ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="container mx-auto flex justify-between items-center pb-1">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">
            <Link to="/" className="hover:text-black transition duration-300">
              EcoPlatform
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((item, index) => (
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
                aria-expanded={isTakeActionOpen}
              >
                Take Action
              </button>
              {isTakeActionOpen && (
                <div className="absolute bg-black bg-opacity-30 shadow-lg mt-2 p-4 rounded-lg space-y-2 w-[150px]">
                  {takeActionLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.to}
                      className="block text-white transition duration-300 border-b-2 border-transparent hover:border-darkGreen"
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Login/Logout Links */}
            {isLoggedIn ? (
              <>
                <button
                  onClick={logout}
                  className="text-white hover:text-red-500 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-white border-b-2 border-transparent hover:border-darkGreen transition duration-300"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle mobile menu"
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-70 backdrop-blur-md p-4 space-y-4 shadow-lg mt-2 rounded-lg">
            {navLinks.map((item, index) => (
              <Link
                key={index}
                to={
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "")}`
                }
                className="block text-white border-b-2 border-transparent hover:border-darkGreen transition duration-300"
              >
                {item}
              </Link>
            ))}

            {/* Take Action Dropdown for Mobile */}
            <div className="relative">
              <button
                onClick={() => setIsTakeActionOpen(!isTakeActionOpen)}
                className="block text-white border-b-2 border-transparent hover:border-darkGreen transition duration-300"
                aria-expanded={isTakeActionOpen}
              >
                Take Action
              </button>
              {isTakeActionOpen && (
                <div className="bg-black bg-opacity-30 shadow-lg mt-2 p-4 rounded-lg space-y-2">
                  {takeActionLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.to}
                      className="block text-white hover:border-darkGreen transition duration-300"
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Login/Logout Links for Mobile */}
            {isLoggedIn ? (
              <>
                <button
                  onClick={logout}
                  className="block text-white hover:text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block text-white hover:border-darkGreen"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
