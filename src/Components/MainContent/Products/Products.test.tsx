import { beforeEach, describe, expect, it, vi } from "vitest";
import * as ReactRouter from "react-router";
import { render, screen } from "@testing-library/react";
import Products from "./Products";

const setSpy = (isLoading = false, isError: string | null = null) => {
  vi.spyOn(ReactRouter, "useOutletContext").mockReturnValue({
    store: {
      loading: isLoading,
      loadingErr: isError,
      data: mockStore,
      findData: vi.fn(),
    },
    cart: mockCart,
  });
};

describe("Test Products component.", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Initial Loading.", async () => {
    setSpy(true);
    render(<Products />);

    expect(screen.getByAltText(/loading content/i)).toBeInTheDocument();
  });

  it("Error content.", async () => {
    setSpy(false, "This is an error message.");
    render(<Products />);

    expect(screen.getByText(/This is an error message./i)).toBeInTheDocument();
  });

  it("Load content.", async () => {
    setSpy();
    render(<Products />);

    expect(screen.getAllByRole("listitem").length).toBe(3);
  });
});

const mockStore = [
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
  },
];

const mockCart = {
  data: () => mockStore.map((prev) => ({ ...prev, quantity: 1 })),
  update: vi.fn(),
  remove: vi.fn(),
  totalItems: vi.fn(),
};
