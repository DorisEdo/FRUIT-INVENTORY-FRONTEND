import FruitCard from "./FruitCard";
import fruitImages from "../utils/fruitImages";
import { Link } from "react-router-dom";

function HeartsPage({
  fruitArray,
  addFruit,
  subTractFruit,
  removeFruit,
  chooseFavouriteFruit,
}) {
  const favouriteFruits = fruitArray.filter((fruit) => fruit.isFavourite);

  return (
    <div className="app-background">
      <div className="totals-box">
        <div>Your Favourite Fruits ❤️</div>
        <Link to="/">Back to fruits</Link>
      </div>

      <div className="Fruitcard">
        {favouriteFruits.length === 0 ? (
          <p className="empty-favourites">You have no favourite fruits yet</p>
        ) : (
          <div className="fruit-grid">
            {favouriteFruits.map((fruit) => (
              <FruitCard
                key={fruit.id}
                fruitId={fruit.id}
                image={fruitImages[fruit.name.toLowerCase()]}
                title={fruit.name}
                count={fruit.count}
                price={fruit.price}
                availability={fruit.availability}
                stars={fruit.stars}
                addFruit={addFruit}
                subTractFruit={subTractFruit}
                removeFruit={removeFruit}
                isFavourite={fruit.isFavourite}
                chooseFavouriteFruit={chooseFavouriteFruit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HeartsPage;
