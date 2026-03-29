import { useEffect, useState } from "react";
import axios from "axios";
import CreateFruitForm from "../components/Admin/CreateFruitForm";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="admin-dashboard">
      <h1 className="admin-dashboard-title">
        🍓 Admin Dashboard - Inventory Management
      </h1>

      <CreateFruitForm onFruitAdded={handleFruitAdded} />

      <div className="inventory-section">
        <h2>Current Inventory ({fruits.length} fruits)</h2>

        {loading ? (
          <p>Loading inventory...</p>
        ) : (
          <div className="inventory-list">
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
