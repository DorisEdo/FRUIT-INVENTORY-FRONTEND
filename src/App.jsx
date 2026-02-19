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
  // const [sortMode, setSortMode] = useState("no-sort");
  // const [selectedStars, setSelectedStars] = useState([]);
  // const [favouriteFruitIds, setFavouriteFruitIds] = useState([]);

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
              // sortMode={sortMode}
              // setSortMode={setSortMode}
              // selectedStars={selectedStars}
              // setSelectedStars={setSelectedStars}
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

// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home.jsx";
// import About from "./pages/About.jsx";
// import Contact from "./pages/Contact.jsx";
// import Posts from "./pages/Posts.jsx";
// import Nav from "./components/Nav.jsx";
// import Users from "./pages/Users.jsx";

// function App() {
//   return (
// {
/* <Router>
  <Nav />
  <Routes> */
// }
// {
/* <Route path="/" element={<Home />} />
        <Route path="/users/:username" element={<Users />} /> */
// }

// {
/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/posts" element={<Posts />} /> */
// }
//   </Routes>
// </Router>;
// //   );
// }

// export default App;

// import MyCourses from "./components/MyCourses.jsx";
// import PopUp from "./components/Popup.jsx";
// import { useState, useEffect } from "react";
// import Counter from "./components/Counter.jsx";

// function App() {
//   const [popUpOpen, setPopUpOpen] = useState(false);

//   function togglePopUp() {
//     setPopUpOpen(true);
//     console.log("Parent notified");
//   }

//   function closePopUp() {
//     setPopUpOpen(false);
//   }

//   useEffect(() => {
//     console.log("ONLY when component mounts");
//   }, []);

//   useEffect(() => {
//     console.log("When component mounted AND ${popUpOpen} changes in value}");
//   }, [popUpOpen]);

//   useEffect(() => {
//     console.log("On every render");
//   });
//   // return <Counter />;

//   return (
//     <>
//       <h1>My Courses</h1>
//       <div>
//         <input
//           type="text"
//           onChange={(event) => {
//             console.log(event.target.value);
//           }}
//         />
//         <button onClick={() => setPopUpOpen(true)}>Add to do</button>
//       </div>
//       <MyCourses togglePopUp={togglePopUp} task={[1, 2, 3]} />
//       <MyCourses togglePopUp={togglePopUp} task="Do the task from Manager" />
//       <MyCourses
//         togglePopUp={togglePopUp}
//         task="Do another Typescript Course"
//       />
//       <MyCourses togglePopUp={togglePopUp} task="Prove naysayers wrong" />

//       {popUpOpen && (
//         <PopUp
//           closePopUp={closePopUp}
//           title="Are you certain you want to confirm?"
//         />
//       )}
//     </>
//   );
// }

// export default App;
