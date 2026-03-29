import "./FruitCounter.css";
import fruitImages from "../utils/fruitImages";
import formatGBP from "../utils/FormatGBP";
import FruitCard from "./FruitCard";
import { Link } from "react-router-dom";
import { totalNumberOfFruits } from "../utils/fruitTotals";
import { masterTotal } from "../utils/fruitTotals";
import { useState } from "react";
import fruitSorter from "../utils/fruitSorter";

function FruitCounter({
  fruitArray,
  addFruit,
  subTractFruit,
  removeFruit,
  chooseFavouriteFruit,
}) {
  const [sortMode, setSortMode] = useState("no-sort");
  const [selectedStars, setSelectedStars] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [alphaSort, setAlphaSort] = useState("none");
  const starOptions = [0, 1, 2, 3, 4, 5];

  const filteredFruits =
    selectedStars.length === 0
      ? fruitArray
      : fruitArray.filter((fruit) => selectedStars.includes(fruit.stars));

  const searchedFruits =
    searchText.trim() === ""
      ? filteredFruits
      : filteredFruits.filter((fruit) =>
          fruit.name.toLowerCase().includes(searchText.trim().toLowerCase()),
        );

  const priceSortedFruits = fruitSorter(sortMode, searchedFruits);

  const displayFruits = [...priceSortedFruits].sort((a, b) => {
    if (alphaSort === "az") return a.name.localeCompare(b.name);
    if (alphaSort === "za") return b.name.localeCompare(a.name);
    return 0; // "none"
  });

  const favouriteFruitCount = fruitArray.filter(
    (fruit) => fruit.isFavourite,
  ).length;

  return (
    <div className="app-background">
      <div className="totals-box">
        <div className="Total-Fruits">
          <Link to="/cart">
            <span>
              Total number of fruits: {totalNumberOfFruits(fruitArray)}
            </span>
          </Link>

          <Link to="/hearts" className="favourite-link">
            <span>❤️ Favourite fruits {favouriteFruitCount}</span>
          </Link>
        </div>

        <div>
          <label>Search fruits:</label>
          <input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search fruits..."
          />
        </div>
      </div>

      <div className="Master-Total">
        <span>Grand total of costs: {formatGBP(masterTotal(fruitArray))}</span>
      </div>
      <div>
        <p>Filter by stars:</p>
        {starOptions.map((star) => (
          <label key={star} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              checked={selectedStars.includes(star)}
              onChange={(event) => {
                if (event.target.checked) {
                  setSelectedStars([...selectedStars, star]);
                } else {
                  setSelectedStars(selectedStars.filter((s) => s !== star));
                }
              }}
            />
            {star} stars
          </label>
        ))}
      </div>
      <div className="sort-control">
        <label>Sort by price</label>
        <select
          value={sortMode}
          onChange={(event) => {
            setSortMode(event.target.value);
          }}
        >
          <option value="no-sort">Default</option>
          <option value="low-to-high">Low-to-high</option>
          <option value="high-to-low">High-to-low</option>
        </select>
      </div>
      <div className="sort-control">
        <label>Sort alphabetically</label>
        <select
          value={alphaSort}
          onChange={(event) => setAlphaSort(event.target.value)}
        >
          <option value="none">None</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>
      </div>

      <div className="Fruitcard">
        {fruitArray.length === 0 ? (
          <div className="empty-state">Loading...</div>
        ) : displayFruits.length === 0 ? (
          <div className="empty-state">
            <h3>No fruits match your filters</h3>
            <p>Try changing your star filter selection.</p>
          </div>
        ) : (
          <div className="fruit-grid">
            {displayFruits.map((fruit) => (
              <div key={fruit.id}>
                <FruitCard
                  image={fruitImages[fruit.name.toLowerCase()]}
                  title={fruit.name}
                  count={fruit.count}
                  addFruit={addFruit}
                  subTractFruit={subTractFruit}
                  availability={fruit.availability}
                  removeFruit={removeFruit}
                  price={fruit.price}
                  stars={fruit.stars}
                  fruitId={fruit.id}
                  isFavourite={fruit.isFavourite}
                  chooseFavouriteFruit={chooseFavouriteFruit}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FruitCounter;
