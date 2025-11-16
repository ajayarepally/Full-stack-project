
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/final.jpeg"


const slides = [
    {
        id: 1,
        image: logo,
        title: "MAA RENTAL BIKES & CARS",
        subtitle: "Rent a car & bike at anytime",
    },
    {
        id: 2,
        image: "https://wallpapercave.com/wp/wp4221546.jpg",
        title: "Ride with Comfort",
        subtitle: "Find the best cars for your next trip",
    },
    {
        id: 3,
        image: "https://nexusautotransport.com/assets/blog/_1200x630_crop_center-center_82_none/image-1_2021-02-17-133156.jpg?mtime=1613568716",
        title: "Affordable & Reliable",
        subtitle: "Book your vehicle anytime, anywhere",
    },
    {
        id: 4,
        image: "https://cdn.wallpapersafari.com/88/91/XulP8U.jpg",
        title: "Adventure Awaits",
        subtitle: "Drive your dream vehicle today",
    },
];

export default function Carousel() {
    const [current, setCurrent] = useState(0);

    // Auto-slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden rounded-2xl shadow-xl mt-6">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    {/* 🔹 Fix: Image fills background properly */}
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.style.display = "none")}
                    />

                    {/* 🔹 Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-6">
                        <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg mb-2">
                            {slide.title}
                        </h2>
                        <p className="text-lg md:text-xl mb-4">{slide.subtitle}</p>
                        <Link to="/vehicles">
                            <button className="px-6 py-2 bg-yellow-500 hover:bg-cyan-600 text-black font-semibold rounded-full transition">
                                Book Now
                            </button>
                        </Link>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <div className="absolute inset-0 flex justify-between items-center px-4">
                <button
                    onClick={() =>
                        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
                    }
                    className="bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70"
                >
                    ❮
                </button>
                <button
                    onClick={() =>
                        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
                    }
                    className="bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70"
                >
                    ❯
                </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-3 h-3 rounded-full ${i === current ? "bg-yellow-400" : "bg-gray-300"
                            }`}
                    ></button>
                ))}
            </div>
        </div>
    );
}
