import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router";
import CartDetails from "./CartDetails";
import userEvent from "@testing-library/user-event";
import type { CartData } from "../../hooks/useStore";
import { useState } from "react";
import type { JSX } from "react/jsx-runtime";

const mockData: CartData[] = [
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
];

type MockCartType = {
  data: () => CartData[];
  update: () => null;
  remove: (id: number) => void;
  totalItems: () => number;
};

const TestWrapper = ({
  children,
}: {
  children: (cart: MockCartType) => JSX.Element;
}) => {
  const [data, setData] = useState<CartData[]>(mockData);

  const cart: MockCartType = {
    data: () => data,
    update: () => null,
    remove(id: number) {
      setData((prev) => [...prev.filter((item) => item.id !== id)]);
    },
    totalItems: () => 6,
  };
  return children(cart);
};

describe("Page header test.", () => {
  it("Initial render.", () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          {(cart) => <CartDetails cart={cart} toggleCart={() => ""} />}
        </TestWrapper>
      </MemoryRouter>,
    );

    expect(screen.getByText("Classic Cotton T-Shirt")).toBeInTheDocument();
    expect(screen.getByText("Leather Wallet")).toBeInTheDocument();
    expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();
  });

  it("Remove second item.", async () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          {(cart) => <CartDetails cart={cart} toggleCart={() => ""} />}
        </TestWrapper>
      </MemoryRouter>,
    );

    expect(screen.getByText("Classic Cotton T-Shirt")).toBeInTheDocument();
    expect(screen.getByText("Leather Wallet")).toBeInTheDocument();
    expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();

    const deleteButton = screen.getAllByRole("button", {
      name: "Remove cart item.",
    })[1];

    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText("Leather Wallet")).not.toBeInTheDocument();
    });

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
