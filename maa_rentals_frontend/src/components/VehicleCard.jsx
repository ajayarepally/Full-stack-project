
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function VehicleCard({ vehicle, startDate, endDate }) {
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    if (!startDate || !endDate) {
      setIsAvailable(true); // assume available if dates not selected
      return;
    }

    api
      .get(
        `/vehicles/${vehicle.id}/availability/?start_date=${startDate}&end_date=${endDate}`
      )
      .then((res) => setIsAvailable(res.data.available))
      .catch((err) => {
        console.error("Availability check failed", err);
        setIsAvailable(true); // fallback
      });
  }, [vehicle, startDate, endDate]);

  return (
    <div className="border p-3 bg-slate-200  rounded shadow hover:shadow-lg transition">
      <img
        src={vehicle.image_url || "/placeholder.png"}
        alt={vehicle.title}
        className="h-40 w-full object-cover rounded"
      />
      <h3 className="text-lg font-bold mt-2">
        {vehicle.brand} - {vehicle.title}
      </h3>
      <p>Price: ₹{vehicle.price_per_day} / day</p>
      <p>Status: {isAvailable ? "Available" : "Not Available"}</p>

      {isAvailable ? (
        <Link
          to={`/vehicles/${vehicle.id}?start_date=${startDate}&end_date=${endDate}`}
          className="mt-2 inline-block px-4 py-2 rounded bg-indigo-600 text-white hover:bg-orange-700 transition"
        >
          Book Now
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="mt-4 w-full px-4 py-2 rounded bg-gray-400 text-gray-200 cursor-not-allowed"
        >
          Not Available
        </button>
      )}
    </div>
  );
}
