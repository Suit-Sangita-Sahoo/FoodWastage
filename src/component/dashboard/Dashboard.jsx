import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [today, setToday] = useState(new Date());

  const products = [
    { id: 1, name: "Milk", category: "Dairy", expiry: "2026-03-25", quantity: "2 Litres" },
    { id: 2, name: "Tomatoes", category: "Vegetable", expiry: "2026-02-22", quantity: "1 Kg" },
    { id: 3, name: "Bread", category: "Bakery", expiry: "2026-02-21", quantity: "2 Packs" },
    { id: 4, name: "Chicken", category: "Meat", expiry: "2026-02-25", quantity: "1 Kg" },
    { id: 5, name: "Yogurt", category: "Dairy", expiry: "2026-02-24", quantity: "500g" },
    { id: 6, name: "Spinach", category: "Vegetable", expiry: "2026-02-29", quantity: "2 Bundles" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setToday(new Date());
    }, 3600000); // updates every hour

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-12">
        🌱 Smart Food Expiry Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {sortedProducts.map((product) => {
          const daysLeft = calculateDaysLeft(product.expiry);
          const status = getStatus(daysLeft);

          const totalDays = 7; // assume avg 7 days shelf life for progress
          const progress =
            daysLeft > 0 ? Math.min((daysLeft / totalDays) * 100, 100) : 0;

          return (
            <div
              key={product.id}
              className="bg-white/30 backdrop-blur-lg p-6 rounded-3xl shadow-xl hover:scale-105 transition duration-300 border border-white/40"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
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
    </div>
  );
};

export default Dashboard;