import { afterEach, describe, expect, it, vi } from "vitest";
import * as ReactRouter from "react-router";
import { MemoryRouter } from "react-router";
import Home from "./Home";
import { render, screen } from "@testing-library/react";

const setSpy = (isLoading = false, isError: string | null = null) => {
  vi.spyOn(ReactRouter, "useOutletContext").mockReturnValue({
    store: {
      loading: isLoading,
      loadingErr: isError,
      data: [
        {
          id: 1,
          title: "Classic Cotton T-Shirt",
          price: 19.99,
          description: "Soft and breathable cotton t-shirt for everyday wear.",
          category: "men's clothing",
          image: "https://fakestoreapi.com/img/tshirt.jpg",
          rating: {
            rate: 4.5,
            count: 120,
          },
          quantity: 2,
        },
        {
          id: 2,
          title: "Leather Wallet",
          price: 35.5,
          description: "Slim genuine leather wallet with multiple card slots.",
          category: "accessories",
          image: "https://fakestoreapi.com/img/wallet.jpg",
          rating: {
            rate: 4.2,
            count: 80,
          },
          quantity: 1,
        },
        {
          id: 3,
          title: "Wireless Headphones",
          price: 89.99,
          description: "Noise-cancelling over-ear wireless headphones.",
          category: "electronics",
          image: "https://fakestoreapi.com/img/headphones.jpg",
          rating: {
            rate: 4.7,
            count: 230,
          },
          quantity: 3,
        },
      ],
      findData: vi.fn((id) => ({
        id: id,
        title: "Wireless Headphones",
        price: 89.99,
        description: "Noise-cancelling over-ear wireless headphones.",
        category: "electronics",
        image: "https://fakestoreapi.com/img/headphones.jpg",
        rating: {
          rate: 4.7,
          count: 230,
        },
      })),
    },
  });
};

describe("Home page.", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Home page - loading.", () => {
    setSpy(true);
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByAltText("Loading content gif.")).toBeInTheDocument();
  });

  it("Home page - error.", () => {
    setSpy(false, "error");
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("Something went wrong, please try again later."),
    ).toBeInTheDocument();
  });

  it("Home page - render.", () => {
    setSpy();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();
    expect(
      screen.getByText("Noise-cancelling over-ear wireless headphones."),
    ).toBeInTheDocument();
  });
});
