export const totalNumberOfFruits = (fruitArray) => {
  return fruitArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.count;
  }, 0);
};

export const subTotalForEachFruit = (fruitArray) =>
  fruitArray.map((fruit) => Number((fruit.count * fruit.price).toFixed(1)));

export const masterTotal = (fruitArray) => {
  const subtotals = subTotalForEachFruit(fruitArray);
  return subtotals.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
};
