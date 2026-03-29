import { useEffect, useState } from "react";
import axios from "axios";
import CreateFruitForm from "../components/Admin/CreateFruitForm";
import CreateCategoryForm from "../components/Admin/CreateCategoryForm";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshCategoriesSignal, setRefreshCategoriesSignal] = useState(0);
  const [message, setMessage] = useState({ type: "", text: "" });

  async function fetchFruits() {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get("http://localhost:5000/api/fruits", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFruits(data);
    } catch (error) {
      console.error("Failed to fetch fruits:", error);
      setMessage({ type: "error", text: "Failed to load inventory" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFruits();
  }, []);

  function handleFruitAdded(newFruit) {
    setFruits((prevFruits) => [newFruit, ...prevFruits]);
  }

  function handleCategoryAdded() {
    setRefreshCategoriesSignal((prev) => prev + 1);
    setMessage({ type: "success", text: "Category added successfully" });
  }

  return (
    <div className="admin-dashboard">
      <h1 className="admin-dashboard-title">
        🍓 Admin Dashboard - Inventory Management
      </h1>

      <CreateCategoryForm onCategoryAdded={handleCategoryAdded} />

      <CreateFruitForm
        onFruitAdded={handleFruitAdded}
        refreshCategoriesSignal={refreshCategoriesSignal}
      />

      <div className="inventory-section">
        <h2>Current Inventory ({fruits.length} fruits)</h2>

        {loading ? (
          <p>Loading inventory...</p>
        ) : (
          <div className="inventory-grid">
            {fruits.map((fruit) => (
              <div className="inventory-item" key={fruit.id}>
                <strong>{fruit.name}</strong> — £
                {(fruit.price / 100).toFixed(2)}
                {" — "}
                Stock: {fruit.stockQuantity}
                {" — "}
                Category: {fruit.category?.name || "No category"}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
