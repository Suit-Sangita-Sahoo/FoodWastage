import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [today, setToday] = useState(new Date());
  const [products, setProducts] = useState([]);

  // Load products from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Update time every hour
  useEffect(() => {
    const timer = setInterval(() => {
      setToday(new Date());
    }, 3600000);
    return () => clearInterval(timer);
  }, []);

  const calculateDaysLeft = (expiryDate) => {
    const expDate = new Date(expiryDate);
    const diff = expDate - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getStatus = (daysLeft) => {
    if (daysLeft <= 0) return { text: "Expired", color: "bg-red-500" };
    if (daysLeft <= 3) return { text: "Expiring Soon", color: "bg-yellow-500" };
    return { text: "Fresh", color: "bg-green-500" };
  };

  // Sort by nearest expiry
  const sortedProducts = [...products].sort(
    (a, b) => calculateDaysLeft(a.expiry) - calculateDaysLeft(b.expiry)
  );

  // Summary counts
  const expiredCount = products.filter(
    (p) => calculateDaysLeft(p.expiry) <= 0
  ).length;

  const expiringSoonCount = products.filter(
    (p) => calculateDaysLeft(p.expiry) > 0 &&
           calculateDaysLeft(p.expiry) <= 3
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
          🌱 Smart Food Expiry Dashboard
        </h1>

        <Link
  to="/manage"
  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
>
  Manage Products
</Link>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-xl font-semibold">📦 Total Products</h2>
          <p className="text-3xl font-bold mt-2">{products.length}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-xl font-semibold text-yellow-600">
            ⚠ Expiring Soon
          </h2>
          <p className="text-3xl font-bold mt-2">{expiringSoonCount}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-xl font-semibold text-red-600">
            ❌ Expired
          </h2>
          <p className="text-3xl font-bold mt-2">{expiredCount}</p>
        </div>
      </div>

      {/* Product Cards */}
      {products.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          No products added yet. Click "Manage Products" to add.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product) => {
            const daysLeft = calculateDaysLeft(product.expiry);
            const status = getStatus(daysLeft);

            const totalDays = 7;
            const progress =
              daysLeft > 0
                ? Math.min((daysLeft / totalDays) * 100, 100)
                : 0;

            return (
              <div
                key={product.id}
                className="bg-white/40 backdrop-blur-lg p-6 rounded-3xl shadow-xl hover:scale-105 transition duration-300 border border-white/40"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {product.name}
                  </h2>
                  <span
                    className={`text-white text-xs px-3 py-1 rounded-full ${status.color}`}
                  >
                    {status.text}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mb-1">
                  📦 Category: {product.category}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  🛒 Quantity: {product.quantity}
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  📅 Expiry: {product.expiry}
                </p>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-gradient-to-r from-green-400 to-red-500 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-lg font-bold">
                  {daysLeft > 0
                    ? `⏳ ${daysLeft} days left`
                    : "❌ Product Expired"}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;