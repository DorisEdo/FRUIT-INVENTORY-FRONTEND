import formatGBP from "../utils/FormatGBP";

function FruitCard({
  image,
  title,
  count,
  availability,
  addFruit,
  subTractFruit,
  removeFruit,
  price,
  stars,
  fruitId,
  isFavourite,
  chooseFavouriteFruit,
}) {
  const isUnavailable = count >= availability;
  return (
    <div className="fruitCard">
      <img
        className={isUnavailable ? "fruit-image unavailable" : "fruit-image"}
        src={image}
        alt="fruit"
      ></img>
      <div className="Fruits">
        <div className="stars">
          {[...Array(5)].map((_, index) => (
            <span key={index}>{index < stars ? "★" : "☆"}</span>
          ))}
        </div>

        <h1>{title}</h1>
        <span className="count">{count}</span>
        <span className="cost">Total cost : {formatGBP(count * price)}</span>
      </div>

      <span className="price">(Price per item: {formatGBP(price)})</span>

      <div className="buttonRow">
        <button
          onClick={() => {
            if (availability > count) {
              addFruit(title);
            }
          }}
        >
          Add
        </button>
        <button
          onClick={() => {
            subTractFruit(title);
          }}
        >
          Subtract
        </button>
        <button
          onClick={() => {
            removeFruit(title);
          }}
        >
          Remove fruit
        </button>
        <button onClick={() => chooseFavouriteFruit(fruitId)}>
          {isFavourite ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}

export default FruitCard;
