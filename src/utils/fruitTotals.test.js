import { describe, it, expect } from "vitest";
import { subTotalForEachFruit } from "./fruitTotals.js";
import { masterTotal } from "./fruitTotals.js";
import { totalNumberOfFruits } from "./fruitTotals.js";

const fruitArray = [
  {
    id: 1,
    name: "Apple",
    price: 0.5,
    count: 2,
    availability: true,
  },
  {
    id: 2,
    name: "Banana",
    price: 0.3,
    count: 3,
    availability: true,
  },
  {
    id: 3,
    name: "Orange",
    price: 0.4,
    count: 1,
    availability: false,
  },
];

describe("fruit totals functions", () => {
  it("should return total number of fruits", () => {
    expect(totalNumberOfFruits(fruitArray)).toBe(6);
  });

  it("should return the subtotal for each fruits", () => {
    expect(subTotalForEachFruit(fruitArray)).toEqual([1, 0.9, 0.4]);
  });
});

it("should return the Master total for all fruits", () => {
  expect(masterTotal(fruitArray)).toBe(2.3);
});
