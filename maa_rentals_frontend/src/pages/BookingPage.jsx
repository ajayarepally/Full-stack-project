
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import api from "../services/api";
// import dayjs from "dayjs";

// export default function BookingPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [vehicle, setVehicle] = useState(null);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("access_token");

//   // Parse dates from query params if present
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const s = params.get("start_date");
//     const e = params.get("end_date");
//     if (s) setStartDate(s);
//     if (e) setEndDate(e);
//   }, [location.search]);

//   // Check login
//   useEffect(() => {
//     if (!token) {
//       alert("Please login to book a vehicle");
//       navigate("/login");
//     }
//   }, [token, navigate]);

//   // Fetch vehicle details
//   useEffect(() => {
//     api
//       .get(`/vehicles/${id}/`)
//       .then((res) => setVehicle(res.data))
//       .catch(() => setError("Failed to load vehicle"));
//   }, [id]);

//   const bookNow = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!startDate || !endDate) {
//       setError("Please select start and end dates.");
//       return;
//     }

//     const days = dayjs(endDate).diff(dayjs(startDate), "day");
//     if (days <= 0) {
//       setError("End date must be after start date.");
//       return;
//     }

//     try {
//       const payload = { vehicle: id, start_date: startDate, end_date: endDate };
//       await api.post("/bookings/", payload);

//       alert(`Booking successful! Total: ₹${(vehicle.price_per_day * days).toFixed(2)}`);
//       navigate("/profile");
//     } catch (err) {
//       console.error(err);
//       setError("Booking failed. Vehicle may not be available.");
//     }
//   };

//   if (!vehicle) return <div>Loading vehicle...</div>;

//   const days = startDate && endDate ? dayjs(endDate).diff(dayjs(startDate), "day") : 0;
//   const totalPrice = days ? (vehicle.price_per_day * days).toFixed(2) : "0.00";

//   return (
//     <div className="max-w-md mx-auto p-4 border rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">
//         Booking: {vehicle.brand} - {vehicle.title}
//       </h2>
//       <img src={vehicle.image_url || "/placeholder.png"} alt={vehicle.title} className="h-64 w-full object-cover mb-4" />

//       {error && <p className="text-red-600 mb-2">{error}</p>}

//       <form onSubmit={bookNow}>
//         <label className="block mb-1">Start Date</label>
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className="block w-full mb-2 border px-2 py-1 rounded"
//           required
//         />

//         <label className="block mb-1">End Date</label>
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           className="block w-full mb-2 border px-2 py-1 rounded"
//           required
//         />

//         <p className="mt-2 font-semibold">Days: {days}</p>
//         <p className="mt-1 font-semibold">Total Price: ₹{totalPrice}</p>

//         <button type="submit" className="mt-4 w-full px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">
//           Book Now
//         </button>
//       </form>
//     </div>
//   );
// }

import React from 'react'

const BookingPage = () => {
  return (
    <div>BookingPage</div>
  )
}

export default BookingPage