import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const isRegistered = localStorage.getItem("isRegistered");

    if (isRegistered === "true") {
      navigate("/login");
    } else {
      alert("Please create an account first!");
      navigate("/signup");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-600 flex items-center justify-center text-white px-4 sm:px-6 md:px-10">
      
      <div className="text-center max-w-6xl w-full">
        
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          🌱 Smart Food Waste Tracker
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg md:text-xl mb-10 text-gray-100 px-2">
          Reduce food waste. Save money. Protect the planet.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              📊 Track Expiry
            </h3>
            <p className="text-sm sm:text-base text-gray-200">
              Monitor food items before they expire and avoid waste.
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              💰 Save Money
            </h3>
            <p className="text-sm sm:text-base text-gray-200">
              Track savings by reducing unnecessary food disposal.
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              🍲 Smart Suggestions
            </h3>
            <p className="text-sm sm:text-base text-gray-200">
              Get recipe ideas using items that will expire soon.
            </p>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          
          <button
            onClick={handleGetStarted}
            className="w-full sm:w-auto bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
          >
            Get Started →
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="w-full sm:w-auto border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
          >
            Create Account
          </button>

        </div>

      </div>
    </div>
  );
};

export default Home;