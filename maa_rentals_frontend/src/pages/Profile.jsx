
import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Profile() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    api.get("/bookings/my_bookings/")
      .then(res => {
        console.log(res.data);
        setBookings(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto mt-6 px-4">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">My Bookings</h3>

      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings yet</p>
      ) : (
        bookings.map((b) => (
          <div
            key={b.id}
            className="p-4 bg-white rounded-lg shadow-md mb-4 border border-gray-100 hover:shadow-lg transition"
          >
            {/* User Info */}
            <p className="text-gray-700 text-sm">
              <span className="font-semibold text-gray-900">User:</span>{" "}
              {b.user?.username || b.user?.name || "Self"}
            </p>

            {/* Vehicle Info */}
            <p className="text-gray-700 text-sm mt-1">
              <span className="font-semibold text-gray-900">Vehicle:</span>{" "}
              {b.vehicle && typeof b.vehicle === "object"
                ? `${b.vehicle.brand || ""} ( ${b.vehicle.model || ""} )`
                : b.vehicle || "Unknown Vehicle"}
            </p>
            
            <p className="text-gray-700 text-sm mt-1">
              <span className="font-semibold text-gray-900">Type:</span>{" "}
              {b.vehicle && typeof b.vehicle === "object"
                ? `${b.vehicle.vehicle_type || ""}`
                : b.vehicle || "Unknown Vehicle"}
            </p>

            {/* Booking Dates */}
            <p className="text-gray-700 text-sm mt-1">
              <span className="font-semibold text-gray-900">Duration:</span>{" "}
              {b.start_date} → {b.end_date}
            </p>

            {/* Price */}
            <p className="text-gray-700 text-sm mt-1">
              <span className="font-semibold text-gray-900">Total:</span> ₹{b.total_price}
            </p>

            {/* Status */}
            <p className="text-sm mt-1">
              <span
                className={`px-2 py-1 rounded text-white ${b.status === "confirmed"
                  ? "bg-green-500"
                  : b.status === "pending"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                  }`}
              >
                {b.status}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  );
}
