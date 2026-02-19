import formatGBP from "../utils/FormatGBP";
import FruitCard from "./FruitCard";
import fruitImages from "../utils/fruitImages";
import { Link } from "react-router-dom";
import { totalNumberOfFruits } from "../utils/fruitTotals";
import { masterTotal } from "../utils/fruitTotals";

function CartPage({
  fruitArray,
  removeFruit,
  clearCart,
  addFruit,
  subTractFruit,
  chooseFavouriteFruit,
}) {
  const selectedFruits = fruitArray.filter((fruit) => {
    return fruit.count > 0;
  });

  return (
    <div>
      <div className="totals-box">
        <button onClick={clearCart}>Delete Cart</button>
        <div>Your Cart</div>
        <div>Total number of fruits:{totalNumberOfFruits(fruitArray)} </div>
        <div>Grand total of cost: {formatGBP(masterTotal(fruitArray))}</div>
        <Link to="/">Back to fruits</Link>
      </div>
      <div>
        {selectedFruits.length === 0 ? (
          "Your cart is empty"
        ) : (
          <div>
            {selectedFruits.map((fruit) => (
              <div className="cart-card" key={fruit.id}>
                <FruitCard
                  image={fruitImages[fruit.name.toLowerCase()]}
                  title={fruit.name}
                  count={fruit.count}
                  subTotal={fruit.count * fruit.price}
                  availability={fruit.availability}
                  addFruit={addFruit}
                  subTractFruit={subTractFruit}
                  removeFruit={removeFruit}
                  price={fruit.price}
                  stars={fruit.stars}
                  isFavourite={fruit.isFavourite}
                  fruitId={fruit.id}
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

export default CartPage;
