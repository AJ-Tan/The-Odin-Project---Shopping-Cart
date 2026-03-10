import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProductCard from "./ProductCard";
import * as ReactRouter from "react-router";
import type { CartData, CartType } from "../../hooks/useStore";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

const productData = {
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
};

type mockOutletType = {
  cart: CartType;
};

const TestWrapper = () => {
  const [cart, setCart] = useState<CartData[]>([]);

  const mockOutlet: mockOutletType = {
    cart: {
      data: cart,
      update(id: number, qty: number | null = null, replace: boolean = false) {
        const found = cart.find((item: { id: number }) => item.id === id);
        if (found === undefined) {
          // this.data.push({ ...productData, quantity: qty === null ? 1 : qty });
          setCart((prev) => [
            ...prev,
            { ...productData, quantity: qty === null ? 1 : qty },
          ]);
        } else {
          setCart((prev) =>
            [...prev].map((cart) => {
              if (cart.id !== id) {
                return cart;
              }
              return {
                ...cart,
                quantity:
                  qty === null
                    ? cart.quantity + 1
                    : replace
                      ? qty
                      : cart.quantity + qty,
              };
            }),
          );
        }
        setCart((prev) => [...prev].filter((cart) => cart.quantity > 0));
      },
      remove(id) {
        setCart((prev) => [...prev].filter((cart) => cart.id !== id));
      },
      totalItems() {
        if (!cart.length) return 0;
        return cart.reduce((prev, curr) => prev + curr.quantity, 0);
      },
    },
  };

  vi.spyOn(ReactRouter, "useOutletContext").mockReturnValue(mockOutlet);

  return <ProductCard product={productData} />;
};

describe("ProductCard Test.", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("Initial display.", () => {
    render(<TestWrapper />);
    expect(screen.getByText(/Classic Cotton T-Shirt/i)).toBeInTheDocument();
    expect(screen.getByText(/men's clothing/i)).toBeInTheDocument();
  });

  it("Add to cart.", async () => {
    render(<TestWrapper />);
    const addToCart = screen.getByRole("button", { name: /add to cart/i });
    await userEvent.click(addToCart);

    const cartQuantity = screen.getByRole("spinbutton") as HTMLInputElement;
    expect(cartQuantity.value).toBe("1");
  });

  it("Increment amount cart.", async () => {
    render(<TestWrapper />);
    const addToCart = screen.getByRole("button", { name: /add to cart/i });
    await userEvent.click(addToCart);

    const cartQuantity = screen.getByRole("spinbutton") as HTMLInputElement;
    expect(cartQuantity.value).toBe("1");

    const incrementBtn = screen.getByRole("button", { name: "+" });
    await userEvent.click(incrementBtn);

    expect(cartQuantity.value).toBe("2");
  });

  it("Decrement amount cart.", async () => {
    render(<TestWrapper />);
    const addToCart = screen.getByRole("button", { name: /add to cart/i });
    await userEvent.click(addToCart);

    const cartQuantity = screen.getByRole("spinbutton") as HTMLInputElement;
    expect(cartQuantity.value).toBe("1");

    const incrementBtn = screen.getByRole("button", { name: "+" });
    await userEvent.click(incrementBtn);

    expect(cartQuantity.value).toBe("2");

    const decrementBtn = screen.getByRole("button", { name: "-" });
    await userEvent.click(decrementBtn);

    expect(cartQuantity.value).toBe("1");
  });
});
