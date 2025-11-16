import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import VehicleList from './pages/VehicleList'
import VehicleDetail from './pages/VehicleDetail'
import BookingPage from './pages/BookingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6 pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<VehicleList />} />
          <Route path="/vehicles/:id" element={<VehicleDetail />} />
          {/* <Route path="/book/:id" element={<BookingPage />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  )
}

export default App
