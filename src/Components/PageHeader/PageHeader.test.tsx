import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PageHeader from "./PageHeader";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

describe("Page header test.", () => {
  const cart = {
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
    update: () => "",
    remove: () => "",
    totalItems: () => 6,
    clearCart: () => {},
  };

  it("Initial render.", () => {
    render(
      <MemoryRouter>
        <PageHeader cart={cart} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "CartVariety" }),
    ).toBeInTheDocument();
  });

  it("Display cart.", async () => {
    render(
      <MemoryRouter>
        <PageHeader cart={cart} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "CartVariety" }),
    ).toBeInTheDocument();

    const cartButton = screen.getByRole("button", {
      name: "Toggle display of cart items.",
    });

    userEvent.click(cartButton);

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Cart" })).toBeVisible();
    });

    expect(screen.getByRole("heading", { name: "Cart" })).toBeVisible();
  });
});
