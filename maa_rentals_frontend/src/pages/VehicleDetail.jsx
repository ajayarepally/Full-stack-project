
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "../services/api";
// import dayjs from "dayjs";

// export default function VehicleDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [vehicle, setVehicle] = useState(null);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [isAvailable, setIsAvailable] = useState(true);
//   const [bookingMsg, setBookingMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("access_token");

//   // Fetch vehicle details
//   useEffect(() => {
//     axios
//       .get(`/vehicles/${id}/`)
//       .then((res) => setVehicle(res.data))
//       .catch((err) => console.error(err));
//   }, [id]);

//   // Check availability whenever dates change
//   useEffect(() => {
//     if (!startDate || !endDate || !vehicle) return;
//     setLoading(true);

//     axios
//       .get(
//         `/vehicles/${vehicle.id}/availability/?start_date=${startDate}&end_date=${endDate}`
//       )
//       .then((res) => setIsAvailable(res.data.available))
//       .catch((err) => {
//         console.error("Availability check failed", err);
//         setIsAvailable(vehicle.is_available);
//       })
//       .finally(() => setLoading(false));
//   }, [vehicle, startDate, endDate]);

//   const handleBooking = async () => {
//     if (!token) {
//       alert("Please login to book a vehicle");
//       navigate("/login");
//       return;
//     }

//     if (!startDate || !endDate) {
//       setBookingMsg("Please select start and end dates");
//       return;
//     }

//     try {
//       const days = dayjs(endDate).diff(dayjs(startDate), "day") + 1;
//       const payload = { vehicle: vehicle.id, start_date: startDate, end_date: endDate };

//       await axios.post("/bookings/", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setBookingMsg(`Booking successful! Total: ₹${(days * vehicle.price_per_day).toFixed(2)}`);
//       setIsAvailable(false);
//     } catch (err) {
//       console.error(err);
//       if (err.response?.data?.non_field_errors) {
//         setBookingMsg(err.response.data.non_field_errors[0]);
//       } else {
//         setBookingMsg("Booking failed. Vehicle may not be available or try again.");
//       }
//     }
//   };

//   if (!vehicle) return <p className="text-center mt-6">Loading...</p>;

//   const days = startDate && endDate ? dayjs(endDate).diff(dayjs(startDate), "day") + 1 : 0;
//   const totalPrice = (days * vehicle.price_per_day).toFixed(2);

//   return (
//     <div className="container mt-4 mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">
//         {vehicle.brand} - {vehicle.title}
//       </h2>

//       {/* Two-column layout */}
//       <div className=" border-2 border-indigo-500 flex flex-col md:flex-row gap-6 items-start bg-white shadow-md rounded-lg p-4">
//         {/* Image Section */}
//         <div className="md:w-1/2 w-full">
//           <img
//             src={vehicle.image_url || "/placeholder.png"}
//             alt={vehicle.title}
//             className="w-full h-72 object-cover rounded-lg shadow-md"
//           />
//         </div>

//         {/* Details Section */}
//         <div className="md:w-1/2 w-full space-y-3">
//           <p className="text-gray-700">{vehicle.description}</p>
//           <p className="text-lg font-semibold">💰 ₹{vehicle.price_per_day} / day</p>
//           <p className="text-gray-600">🚗 Transmission: {vehicle.transmission || "N/A"} &nbsp;&nbsp; ⛽Fuel Type: {vehicle.fuel_type}</p> 
//           <p className="text-gray-600">🧍 Seating Capacity: {vehicle.seats || "N/A"}</p>

//           {/* Date Inputs */}
//           <div className="gap-4 mt-3">
//             <div>
//               <label className="font-semibold text-sm">Start Date - </label>
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className=" border px-2 py-1 ml-2 rounded"
//               />
//             </div>
//             <div>
//               <label className="no-wrap font-semibold text-sm">End Date -</label>
//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="border px-2 py-1 ml-2 mt-2 rounded "
//               />
//             </div>
//           </div>

//           {/* Availability & Price */}
//           <p className="mt-2 text-gray-700">
//             Status:{" "}
//             <span className={isAvailable ? "text-green-600 font-semibold" : "text-red-500"}>
//               {loading ? "Checking..." : isAvailable ? "Available" : "Not Available"}
//             </span>
//           </p>
//           {days > 0 && (
//             <>
//               <p>Days: {days}</p>
//               <p className="font-semibold text-indigo-700">Total Price: ₹{totalPrice}</p>
//             </>
//           )}

//           {/* Buttons */}
//           <div className="flex flex-col sm:flex-row gap-3 mt-4">
//             <button
//               onClick={handleBooking}
//               disabled={!isAvailable}
//               className={`px-4 py-2 rounded text-white ${
//                 isAvailable ? "bg-indigo-600 hover:bg-red-700" : "bg-gray-400"
//               }`}
//             >
//               Book Now
//             </button>
//               <span>OR</span>
//             <a
//               href="tel:+919876543210"
//               className="px-4 py-2 rounded bg-green-500 hover:bg-green-800 text-white text-center"
//             >
//               📞 Call Us
//             </a>
//           </div>

//           {bookingMsg && <p className="mt-2 text-red-600">{bookingMsg}</p>}
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="mt-10 bg-gray-900 text-gray-300 py-6 text-center">
//         <div className="container mx-auto px-4">
//           <h2 className="text-lg font-semibold mb-2">Maa Rentals</h2>
//           <p className="text-sm">
//             🚗 Premium Cars & Bikes for Rent | Reliable Service | Affordable Prices
//           </p>
//           <p className="mt-2 text-sm">
//             📍 Kompally,Hyderabad | 📞 +91 98765 43210 | ✉️ info@maarentals.com
//           </p>
//           <p className="mt-4 text-xs text-gray-200">
//             © {new Date().getFullYear()} Maa Rentals. All rights reserved.
//           </p>
//         </div>
//       </footer>

//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import dayjs from "dayjs";

export default function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [bookingMsg, setBookingMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const token =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");

  // Fetch vehicle details
  useEffect(() => {
    api
      .get(`/vehicles/${id}/`)
      .then((res) => setVehicle(res.data))
      .catch(() => console.log("Vehicle load error"));
  }, [id]);

  // Availability check
  useEffect(() => {
    if (!startDate || !endDate || !vehicle) return;

    setLoading(true);

    api
      .get(
        `/vehicles/${vehicle.id}/availability/?start_date=${startDate}&end_date=${endDate}`
      )
      .then((res) => setIsAvailable(res.data.available))
      .catch(() => setIsAvailable(vehicle.is_available))
      .finally(() => setLoading(false));
  }, [vehicle, startDate, endDate]);

  // Booking handler
  const handleBooking = async () => {
    if (!token) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }

    if (!startDate || !endDate) {
      setBookingMsg("Please select valid dates");
      return;
    }

    try {
      const days = dayjs(endDate).diff(dayjs(startDate), "day") + 1;

      await api.post("/bookings/", {
        vehicle: vehicle.id,
        start_date: startDate,
        end_date: endDate,
      });

      setBookingMsg(
        `Booking Successful! Total ₹${days * vehicle.price_per_day}`
      );
      setIsAvailable(false);
    } catch (err) {
      setBookingMsg("Booking failed. Vehicle unavailable.");
    }
  };

  if (!vehicle)
    return <p className="text-center mt-10 text-lg">Loading vehicle...</p>;

  const days =
    startDate && endDate
      ? dayjs(endDate).diff(dayjs(startDate), "day") + 1
      : 0;

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">
        {vehicle.brand} - {vehicle.title}
      </h1>

      {/* Card Layout */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 p-6 flex flex-col md:flex-row gap-8">
        
        {/* LEFT - Image */}
        <div className="md:w-1/2">
          <img
            src={vehicle.image_url}
            alt={vehicle.title}
            className="w-full h-80 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* RIGHT - Info */}
        <div className="md:w-1/2 space-y-4">
          
          {/* Description */}
          <p className="text-gray-700 leading-relaxed">{vehicle.description}</p>

          {/* Price */}
          <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded">
            <p className="text-lg font-semibold text-indigo-700">
              ₹{vehicle.price_per_day} <span className="text-gray-600">/ day</span>
            </p>
          </div>

          {/* Specs */}
          <div className="text-gray-700">
            <p>🚗 <b>Transmission:</b> {vehicle.transmission || "N/A"}</p>
            <p>⛽ <b>Fuel Type:</b> {vehicle.fuel_type}</p>
            <p>🧍 <b>Seats:</b> {vehicle.seats || "N/A"}</p>
          </div>

          {/* Date Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold">Start Date</label>
              <input
                type="date"
                className="w-full border px-3 py-2 rounded mt-1"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label className="font-semibold">End Date</label>
              <input
                type="date"
                className="w-full border px-3 py-2 rounded mt-1"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* Availability */}
          <p className="font-bold mt-2">
            Status:{" "}
            <span
              className={`px-2 py-1 rounded text-white ${
                loading
                  ? "bg-gray-500"
                  : isAvailable
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >
              {loading
                ? "Checking..."
                : isAvailable
                ? "Available"
                : "Not Available"}
            </span>
          </p>

          {/* Total Price */}
          {days > 0 && (
            <div className="bg-indigo-100 border border-indigo-300 p-3 rounded">
              <p className="font-bold text-indigo-800 text-lg">
                Total Price: ₹{days * vehicle.price_per_day}
              </p>
            </div>
          )}

          {/* Buttons */}
          <button
            onClick={handleBooking}
            disabled={!isAvailable}
            className={`w-full py-3 text-lg font-semibold rounded-xl shadow-md transition ${
              isAvailable
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-gray-400 text-black cursor-not-allowed"
            }`}
          >
            Book Now
          </button>

          {bookingMsg && (
            <p className="text-md text-red-600 font-semibold mt-2">
              {bookingMsg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

