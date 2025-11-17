import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo3.jpg";
import { HashLink as Link1 } from 'react-router-hash-link';

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const menuRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
    setIsOpen(false); // Close menu after logout
  };

  const token = localStorage.getItem("access_token");

  // Update menu height dynamically for smooth slide-down
  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.scrollHeight);
    }
  }, [menuRef, isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo + Title */}
        <Link
          to="/"
          className="flex items-center space-x-2 font-bold text-xl text-indigo-700"
        >
          <img
            src={logo}
            alt="Maa Rentals Logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="hidden sm:inline text-black">MAA Rentals</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex gap-4 items-center text-gray-700 text-sm sm:text-base">
          <Link to="/vehicles" className="hover:text-indigo-600 transition-colors">
            Search
          </Link>
          <Link1 smooth to="/#call-section" className="hover:text-indigo-600 transition-colors">
            Contact Us
          </Link1>
          <Link1 smooth to="/#about" className="hover:text-indigo-600 transition-colors">
            About Us
          </Link1>
          {token ? (
            <>
              <Link to="/profile" className="hover:text-indigo-600 transition-colors">
                Bookings
              </Link>
              <button
                onClick={logout}
                className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-600 transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-orange-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle button */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile links with slide-down */}
      <div
        ref={menuRef}
        style={{
          maxHeight: isOpen ? `${menuHeight}px` : "0px",
        }}
        className="sm:hidden flex flex-col overflow-hidden transition-all duration-300 bg-white"
      >
        <Link
          to="/vehicles"
          className="hover:text-indigo-600 transition-colors py-2 px-4 border-b border-gray-200"
          onClick={() => setIsOpen(false)}
        >
          Search
        </Link>
        <Link1
          smooth
          to="/#call-section"
          className="hover:text-indigo-600 transition-colors py-2 px-4 border-b border-gray-200"
          onClick={() => setIsOpen(false)}
        >
          Contact Us
        </Link1>
        <Link1
          smooth
          to="/#about"
          className="hover:text-indigo-600 transition-colors py-2 px-4 border-b border-gray-200"
          onClick={() => setIsOpen(false)}
        >
          About Us
        </Link1>
        {token ? (
          <>
            <Link
              to="/profile"
              className="hover:text-indigo-600 transition-colors py-2 px-4 border-b border-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Bookings
            </Link>
            <button
              onClick={logout}
              className="bg-indigo-600 text-white px-4 py-2 m-4 rounded hover:bg-indigo-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-indigo-600 transition-colors py-2 px-4 border-b border-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-4 py-2 m-4 rounded hover:bg-orange-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
