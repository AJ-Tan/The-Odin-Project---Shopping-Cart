import { beforeEach, describe, expect, it, vi } from "vitest";
import useStore, { type CartData } from "../../hooks/useStore";
import Checkout from "./Checkout";
import * as ReactRouter from "react-router";
import { render, screen, waitFor } from "@testing-library/react";

const mockFetch = vi.fn();
const mockStoreData = [
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

const mockCartData = [
  { id: 1, quantity: 2 },
  { id: 2, quantity: 1 },
  { id: 3, quantity: 5 },
];

const storage: Record<string, string> = {
  cartData: JSON.stringify(mockCartData),
};

const TestWrapper = () => {
  const { store, cart } = useStore();

  vi.spyOn(ReactRouter, "useOutletContext").mockReturnValue({
    store,
    cart,
  });

  return <Checkout />;
};

describe("Checkout testing.", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("fetch", mockFetch);
    vi.stubGlobal("localStorage", {
      getItem: vi.fn((key: string) => storage[key] ?? null),
      setItem: vi.fn(),
    });
  });

  it("Initial render", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => mockStoreData,
    });

    render(
      <ReactRouter.MemoryRouter>
        <TestWrapper />
      </ReactRouter.MemoryRouter>,
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getAllByRole("listitem").length).toBe(3);
  });

  it("Check amount.", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => mockStoreData,
    });

    render(
      <ReactRouter.MemoryRouter>
        <TestWrapper />
      </ReactRouter.MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    const mockData = mockCartData.reduce<CartData[]>((prev, item) => {
      const findItem = mockStoreData.find(
        (storeItem) => storeItem.id === item.id,
      );
      if (!findItem) return prev;
      return [...prev, { ...findItem, quantity: item.quantity }];
    }, []);

    const regexDelimiter = /\B(?=(\d{3})+(?!\d))/g;
    const subTotalAmount = mockData.reduce(
      (prev, item) => prev + item.price * item.quantity,
      0,
    );
    const discountAmount = subTotalAmount * 0.05;
    const shippingAmount = (subTotalAmount - discountAmount) * 0.15;
    const totalAmount = subTotalAmount - discountAmount + shippingAmount;

    expect(
      screen.getByText(
        `$${subTotalAmount.toFixed(2).replace(regexDelimiter, ",")}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `$${discountAmount.toFixed(2).replace(regexDelimiter, ",")}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `$${shippingAmount.toFixed(2).replace(regexDelimiter, ",")}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `$${totalAmount.toFixed(2).replace(regexDelimiter, ",")}`,
      ),
    ).toBeInTheDocument();
  });
});
