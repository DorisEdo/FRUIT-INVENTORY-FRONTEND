function fruitSorter(sortMode, fruitArray) {
  let sortedFruits = fruitArray;

  if (sortMode === "low-to-high") {
    sortedFruits = [...fruitArray].sort((a, b) => a.price - b.price);
  } else if (sortMode === "high-to-low") {
    sortedFruits = [...fruitArray].sort((a, b) => b.price - a.price);
  }
  return sortedFruits;
}

export default fruitSorter;
