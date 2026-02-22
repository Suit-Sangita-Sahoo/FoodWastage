import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManageProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    expiry: "",
    quantity: ""
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setProducts(products.map(p =>
        p.id === editingId ? { ...formData, id: editingId } : p
      ));
      setEditingId(null);
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }

    setFormData({
      id: "",
      name: "",
      category: "",
      expiry: "",
      quantity: ""
    });
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product.id);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-100 to-purple-100">
      
      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📦 Manage Products</h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
        >
          ⬅ Back to Dashboard
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="border p-2 rounded" required />
          <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="border p-2 rounded" required />
          <input type="date" name="expiry" value={formData.expiry} onChange={handleChange} className="border p-2 rounded" required />
          <input name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" className="border p-2 rounded" required />
        </div>

        <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      <div className="grid md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="font-bold text-lg">{product.name}</h2>
            <p>{product.category}</p>
            <p>{product.expiry}</p>
            <p>{product.quantity}</p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;