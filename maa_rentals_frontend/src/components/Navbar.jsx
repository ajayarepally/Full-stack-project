
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo3.jpg";
import { HashLink as Link1 } from 'react-router-hash-link';


export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  const token = localStorage.getItem("access_token");

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

        {/* Nav Links */}
        <div className="flex gap-4 items-center text-gray-700 text-sm sm:text-base">
          <Link
            to="/vehicles"
            className="hover:text-indigo-600 transition-colors"
          >
            Search
          </Link>

          <Link1
            smooth
            to="/#call-section"
            className="hover:text-indigo-600 transition-colors"
          >
            Contact Us
          </Link1>

          <Link1
            smooth
            to="/#about"
            className="hover:text-indigo-600 transition-colors"
          >
            About Us
          </Link1>


          {token ? (
            <>
              <Link
                to="/profile"
                className="hover:text-indigo-600 transition-colors"
              >
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
              <Link
                to="/login"
                className="hover:text-indigo-600 transition-colors"
              >
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
      </div>
    </nav>
  );
}
