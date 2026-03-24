import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import FruitCounter from "./components/FruitCounter";
import CartPage from "./components/CartPage";
import HeartsPage from "./components/HeartsPage";
import "./App.css";

function App() {
  const [fruitArray, setFruitArray] = useState([]);
  const [error, setError] = useState(null);

  async function fetchFruitData() {
    try {
      const { data } = await axios.get("/api/fruit/all");
      const newData = data.map((fruit) => {
        return {
          id: fruit.id,
          name: fruit.name,
          count: 0,
          price: fruit.nutritions.calories,
          availability: Math.trunc(fruit.nutritions.sugar),
          stars: Math.floor(Math.random() * 6),
          isFavourite: false,
        };
      });
      setFruitArray(newData);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    fetchFruitData();
  }, []);

  const addFruit = (fruitName) => {
    setFruitArray((prevArray) => {
      return prevArray.map((fruit) => {
        if (fruitName === fruit.name) {
          return { ...fruit, count: fruit.count + 1 };
        }
        return fruit;
      });
    });
  };

  const subTractFruit = (fruitName) => {
    setFruitArray((prevArray) => {
      return prevArray.map((fruit) => {
        if (fruitName === fruit.name) {
          return { ...fruit, count: Math.max(0, fruit.count - 1) };
        }
        return fruit;
      });
    });
  };

  const removeFruit = (fruitName) => {
    setFruitArray((prevArray) => {
      return prevArray.map((fruit) => {
        if (fruitName === fruit.name) {
          return { ...fruit, count: 0 };
        }
        return fruit;
      });
    });
  };

  const clearCart = () => {
    setFruitArray((prevArray) => {
      return prevArray.map((fruit) => {
        return { ...fruit, count: 0 };
      });
    });
  };

  const chooseFavouriteFruit = (fruitId) => {
    console.log(fruitId);
    setFruitArray((prevArray) => {
      return prevArray.map((fruit) => {
        if (fruitId === fruit.id) {
          return { ...fruit, isFavourite: !fruit.isFavourite };
        }
        return fruit;
      });
    });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <FruitCounter
              fruitArray={fruitArray}
              addFruit={addFruit}
              subTractFruit={subTractFruit}
              removeFruit={removeFruit}
              chooseFavouriteFruit={chooseFavouriteFruit}
            />
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <CartPage
              fruitArray={fruitArray}
              addFruit={addFruit}
              subTractFruit={subTractFruit}
              removeFruit={removeFruit}
              clearCart={clearCart}
              chooseFavouriteFruit={chooseFavouriteFruit}
            />
          }
        ></Route>
        <Route
          path="/hearts"
          element={
            <HeartsPage
              fruitArray={fruitArray}
              addFruit={addFruit}
              subTractFruit={subTractFruit}
              removeFruit={removeFruit}
              chooseFavouriteFruit={chooseFavouriteFruit}
            />
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
