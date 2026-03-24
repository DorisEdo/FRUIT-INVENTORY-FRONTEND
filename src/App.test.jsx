import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, afterEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import axios from "axios";

afterEach(() => {
  cleanup();
});

vi.mock("axios"); //here it's saying Vi.mock ("axios")

const fakeFruitsMock = [
  { name: "Apple", id: 2, nutritions: { calories: 25, sugar: 2.6 } },
  { name: "Pear", id: 6, nutritions: { calories: 56, sugar: 5.1 } },
  { name: "Orange", id: 8, nutritions: { calories: 56, sugar: 4.3 } },
];

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    BrowserRouter: ({ children }) => <>{children}</>, // disable BrowserRouter during tests
  };
});

describe("FruitCouter with mocked API", () => {
  test("shows fruit from the mocked API", async () => {
    axios.get.mockResolvedValue({ data: fakeFruitsMock });

    // MemoryRouter is a fake router that works inside test environment.
    //You cannot use <BrowserRouter> in a test because it depends on the real browser’s history API.
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    screen.debug();

    expect(await screen.findByText("Apple")).toBeInTheDocument();
    expect(await screen.findByText("Pear")).toBeInTheDocument();
    expect(await screen.findByText("Orange")).toBeInTheDocument();
  });

  test("checks naviagtion from home page / to cartPage /cart page works", async () => {
    axios.get.mockResolvedValue({ data: fakeFruitsMock });
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    screen.debug();

    expect(await screen.findByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Total number of fruits: 0")).toBeInTheDocument();

    const cartLink = screen.getByRole("link", {
      name: "Total number of fruits: 0",
    });
    fireEvent.click(cartLink);
    expect(screen.getByText("Your Cart")).toBeInTheDocument();
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(screen.getByText(/Total number of fruits:s*0/)).toBeInTheDocument();
    expect(screen.getByText("Grand total of cost: £0.00")).toBeInTheDocument();

    const backToFruitLink = screen.getByRole("link", {
      name: "Back to fruits",
    });
    fireEvent.click(backToFruitLink);
    expect(screen.getByText("Pear")).toBeInTheDocument();
    expect(screen.queryByText("Your cart is empty")).not.toBeInTheDocument();
  });
});
