import React, { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import VehicleCard from "../components/VehicleCard";
import Carousel from "../components/Carousel";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "framer-motion";


// Fix default icon issue in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [cars, setCars] = useState([]);
  const [bikes, setBikes] = useState([]);

  const [showAllCars, setShowAllCars] = useState(false);
  const [showAllBikes, setShowAllBikes] = useState(false);
  const [showAllVehicles, setShowAllVehicles] = useState(false);

  const vehiclesPerRow = 4;
  const rowsToShow = 2;
  const maxVisible = vehiclesPerRow * rowsToShow;

  // Scroll to top after render
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);


  const storeLocation = {
    lat: 17.53881,
    lng: 78.4827,
    name: "Maa Rental Bikes & Cars",
  };

  const reviews = [
    { name: "Rahul Sharma", text: "Best rental service I’ve used. Cars are clean and well maintained!", rating: 5 },
    { name: "Sneha Reddy", text: "Very smooth booking process and polite staff!", rating: 4 },
    { name: "Vikram Patel", text: "Affordable rates and quick pickup/drop service.", rating: 5 },
    { name: "Priya Nair", text: "Loved the experience. Definitely renting again!", rating: 5 },
    { name: "Ankit Verma", text: "Customer service is top-notch. Highly recommend!", rating: 4 },
  ];

  const [currentReview, setCurrentReview] = useState(0);




  useEffect(() => {
    axios
      .get("https://full-stack-project-7-s9hh.onrender.com/api/vehicles/")
      .then((res) => {
        setVehicles(res.data);
        setCars(res.data.filter((v) => v.vehicle_type.toLowerCase() === "car"));
        setBikes(res.data.filter((v) => v.vehicle_type.toLowerCase() === "bike"));
      })
      .catch((err) => console.error(err));
  }, []);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const renderVehicles = (list, showAllFlag, setShowAllFlag) => {
    const visibleList = showAllFlag ? list : list.slice(0, maxVisible);

    return (
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 relative">
        {visibleList.map((v, idx) => (
          <div key={v.id} className="relative group">
            <VehicleCard vehicle={v} />

            {!showAllFlag && idx === maxVisible - 1 && list.length > maxVisible && (
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowAllFlag(true)}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-semibold hover:bg-opacity-70 transition"
              >
                View All
              </button>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Main content */}
      <div className="container mx-auto pt-6 space-y-10 z-0">
        {/* Animated Info Banner */}
        <div className="relative overflow-hidden w-full bg-gray-100 py-2">
          <div className="animate-car flex items-center space-x-2 font-bold text-black text-sm sm:text-base">
            <span>🚗💨</span>
            <span>
              Unlimited Kilometers &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp; ▪️Extra one day free on Birthdays🎉 &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp; ▪️Neatly Washed Cars &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp; ▪️Choose Your Favourite Color(Cars & Bikes) &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp; ▪️⚠️Any Problem 24/7 Service &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp; ▪️⌛Choose Your Own Hours &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp; ▪️💰Lowest Price Challenge &nbsp;&nbsp;&nbsp;   &nbsp;&nbsp;&nbsp; ▪️🎯No Deposit
            </span>
          </div>
        </div>

        {/* Carousel */}
        <Carousel />

        {/* Cars */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Cars</h2>
          {renderVehicles(cars, showAllCars, setShowAllCars)}
        </div>

        {/* Bikes Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Bikes</h2>
          {renderVehicles(bikes, showAllBikes, setShowAllBikes)}
        </div>

        {/* All Vehicles Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">All Vehicles</h2>
          {renderVehicles(vehicles, showAllVehicles, setShowAllVehicles)}
        </div>

        {/* Store Location Map */}
        <div id="call-section">
          <h2 className="text-2xl font-bold mb-4">Our Store Location</h2>
          <a href="https://maps.app.goo.gl/u2z6ktKEEXHwzM1e8" target="blank">
            <MapContainer
              center={[storeLocation.lat, storeLocation.lng]}
              zoom={20}
              scrollWheelZoom={true}
              dragging={true}
              style={{ height: "400px", width: "100%", zIndex: 0 }}
            >
              <TileLayer
                url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
                attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
              />
              <Marker position={[storeLocation.lat, storeLocation.lng]}>
                <Popup>{storeLocation.name}</Popup>
              </Marker>

            </MapContainer>
          </a>
          <a href="https://maps.app.goo.gl/u2z6ktKEEXHwzM1e8" target="blank">
            <button className="bg-cyan-900 mt-3 p-2 rounded-lg text-white">
              🚩 Click to Navigate...
            </button>
          </a>
        </div>
      </div>


      {/* Animated Collaborate / Call Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-gray-500 text-white rounded-lg shadow-lg mt-6 p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div>
          <h3 className="text-xl font-semibold">Call Us for Attachments or Book Instantly?</h3>
          <p className="text-sm text-indigo-100">
            Contact our team for exclusive offers or partnership opportunities.
          </p>
        </div>
        <a
          href="tel:+916302016824"
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-5 py-2 rounded-lg transition transform hover:scale-105"
        >
          📞 Call Now
        </a>
      </motion.div>

      {/* Customer Feedback Section */}
      <div className="bg-gray-100 py-10 mt-10 rounded-lg shadow-inner">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🚘 What Our Customers Say
        </h2>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))}
              className="text-gray-500 hover:text-cyan-500 transition text-5xl font-bold"
            >
              ‹
            </button>

            <div className="text-center w-full px-4">
              <p className="text-gray-700 italic mb-2">“{reviews[currentReview].text}”</p>
              <p className="font-semibold text-gray-900">- {reviews[currentReview].name}</p>
              <p className="text-yellow-500">
                {"★".repeat(reviews[currentReview].rating)}{"☆".repeat(5 - reviews[currentReview].rating)}
              </p>
            </div>

            <button
              onClick={() => setCurrentReview((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))}
              className="text-gray-500 hover:text-cyan-500 transition text-5xl font-bold"
            >
              ›
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-700 transition-colors"
        aria-label="Scroll to top"
      >
        ↑
      </button>

      {/* About Us Section */}
      <div className="bg-gray-900 text-gray-200 py-12 mt-10 rounded-t-3xl">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-cyan-400">About US</h2>
          <p className="text-gray-300 mb-6">
            At <span className="font-semibold text-white">Maa Rentals</span>, we believe in making your travel easy,
            affordable, and memorable. Whether you're planning a road trip, a weekend getaway, or
            need a daily ride, we’ve got you covered with a wide range of bikes and cars.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
            <div className="p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-cyan-300">🚗 Wide Fleet</h3>
              <p className="text-sm text-gray-400">Choose from economy to luxury vehicles at your convenience.</p>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-cyan-300">💰 Affordable Prices</h3>
              <p className="text-sm text-gray-400">Transparent pricing with no hidden charges.</p>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-cyan-300">⭐ Reliable Service</h3>
              <p className="text-sm text-gray-400">Customer satisfaction and vehicle quality are our priorities.</p>
            </div>
          </div>

          <p className="mt-10 text-gray-400 text-sm">
            📍Available 24/7 | Your Trusted Travel Partner 🚀
          </p>
        </div>
      </div>


      {/* Footer */}
      <footer className="mt-10 bg-gray-900 text-gray-300 py-6 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-lg font-semibold mb-2">Maa Rentals</h2>
          <p className="text-sm">
            🚗 Premium Cars & Bikes for Rent | Reliable Service | Affordable Prices
          </p>
          <p className="mt-2 text-sm">
            📍 Kompally,Hyderabad | 📞 +91 98765 43210 | ✉️ info@maarentals.com
          </p>
          <p className="mt-4 text-xs text-gray-200">
            © {new Date().getFullYear()} Maa Rentals. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Home;
