
import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { Link } from 'react-router-dom'

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([])
  const [search, setSearch] = useState('')
  const [filteredVehicles, setFilteredVehicles] = useState([])
  const [showAll, setShowAll] = useState(false)

  const vehiclesPerRow = 3
  const rowsToShow = 2
  const maxVisible = vehiclesPerRow * rowsToShow

  // Fetch vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await api.get("/vehicles/");
        setVehicles(res.data)
        setFilteredVehicles(res.data)
      } catch (err) {
        console.error('Error fetching vehicles', err)
      }
    }

    fetchVehicles()
    const interval = setInterval(fetchVehicles, 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Filter vehicles
  useEffect(() => {
    const filtered = vehicles.filter(v =>
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.brand.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredVehicles(filtered)
  }, [search, vehicles])

  // Vehicles to show
  const visibleVehicles = showAll ? filteredVehicles : filteredVehicles.slice(0, maxVisible)

  return (
    <div className='pt-4'>
      <h2 className="text-2xl font-semibold mb-4">Vehicles</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by brand or title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded shadow focus:outline-none focus:ring focus:border-indigo-300"
        />
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
        {visibleVehicles.map((v, idx) => (
          <div key={v.id} className="border p-4 rounded shadow relative group overflow-hidden">
            <img
              src={v.image_url || '/placeholder.png'}
              alt={v.title}
              className="w-full object-cover rounded"
            />
            <h3 className="text-lg font-bold mt-2">{v.brand} - {v.title}</h3>
            <p>Price: ₹{v.price_per_day} / day</p>
            <p>Status: {v.is_active ? 'Available' : 'Not Available'}</p>
            <Link
              to={`/vehicles/${v.id}`}
              className={`mt-2 inline-block px-4 py-2 rounded ${v.is_active ? 'bg-indigo-600 text-white hover:bg-orange-700' : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
            >
              {v.is_active ? 'View Details' : 'Not Available'}
            </Link>

            {/* View All overlay button */}
            {!showAll && idx === maxVisible - 1 && filteredVehicles.length > maxVisible && (
              <button
                onClick={() => setShowAll(true)}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-semibold hover:bg-opacity-70 transition"
              >
                View All
              </button>
            )}
          </div>
        ))}

        {/* If no vehicles */}
        {filteredVehicles.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No vehicles found.</p>
        )}
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

    </div>
  )
}

export default VehicleList
