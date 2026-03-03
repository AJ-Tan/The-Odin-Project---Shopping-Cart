import { act, renderHook, waitFor } from "@testing-library/react";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import useStore from "./useStore";

const mockFetch = vi.fn();
const mockData = [
  {
    id: 1,
    title: "test bag",
  },
];

describe("useStore functionalities.", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("fetch", mockFetch);
    vi.stubGlobal("localStorage", {
      getItem: vi.fn(() => JSON.stringify([])),
      setItem: vi.fn(),
    });
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it("useStore initialized fetch.", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => mockData,
    });
    const { result } = renderHook(() => useStore());

    // Initialization
    expect(result.current.store.loading).toBe(true);
    expect(result.current.store.data).toBe(null);

    await waitFor(() => {
      expect(result.current.store.loading).toBe(false);
    });
    expect(result.current.store.data).toBe(mockData);
  });

  it("Add to cart.", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => mockData,
    });
    const { result } = renderHook(() => useStore());

    // Initialization
    expect(result.current.store.loading).toBe(true);
    expect(result.current.store.data).toBe(null);

    await waitFor(() => {
      expect(result.current.store.loading).toBe(false);
    });

    // Add to Cart
    act(() => {
      result.current.cart.update(1);
    });
    expect(result.current.cart.data).toEqual([{ id: 1, quantity: 1 }]);
  });

  it("Increment cart item.", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => mockData,
    });
    const { result } = renderHook(() => useStore());

    // Initialization
    expect(result.current.store.loading).toBe(true);
    expect(result.current.store.data).toBe(null);

    await waitFor(() => {
      expect(result.current.store.loading).toBe(false);
    });

    // Add to Cart
    act(() => {
      result.current.cart.update(1);
    });
    expect(result.current.cart.data).toEqual([{ id: 1, quantity: 1 }]);

    // Increment cart quantity
    act(() => {
      result.current.cart.update(1);
    });
    expect(result.current.cart.data).toEqual([{ id: 1, quantity: 2 }]);
  });

  it("Add Item by 5, then increment it by 10.", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => mockData,
    });
    const { result } = renderHook(() => useStore());

    // Initialization
    expect(result.current.store.loading).toBe(true);
    expect(result.current.store.data).toBe(null);

    await waitFor(() => {
      expect(result.current.store.loading).toBe(false);
    });

    // Add to Cart
    act(() => {
      result.current.cart.update(1, 5);
    });
    expect(result.current.cart.data).toEqual([{ id: 1, quantity: 5 }]);

    // Increment cart quantity
    act(() => {
      result.current.cart.update(1, 10);
    });
    expect(result.current.cart.data).toEqual([{ id: 1, quantity: 15 }]);
  });

  it("Add Item by 5, then replace it by 10.", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => mockData,
    });
    const { result } = renderHook(() => useStore());

    // Initialization
    expect(result.current.store.loading).toBe(true);
    expect(result.current.store.data).toBe(null);

    await waitFor(() => {
      expect(result.current.store.loading).toBe(false);
    });

    // Add to Cart
    act(() => {
      result.current.cart.update(1, 5);
    });
    expect(result.current.cart.data).toEqual([{ id: 1, quantity: 5 }]);

    // Increment cart quantity
    act(() => {
      result.current.cart.update(1, 10, true);
    });
    expect(result.current.cart.data).toEqual([{ id: 1, quantity: 10 }]);
  });

  it("Remove cart item.", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => mockData,
    });
    const { result } = renderHook(() => useStore());

    // Initialization
    expect(result.current.store.loading).toBe(true);
    expect(result.current.store.data).toBe(null);

    await waitFor(() => {
      expect(result.current.store.loading).toBe(false);
    });

    // Add to Cart
    act(() => {
      result.current.cart.update(1);
    });
    expect(result.current.cart.data).toEqual([{ id: 1, quantity: 1 }]);

    // Remove cart item
    act(() => {
      result.current.cart.remove(1);
    });

    expect(result.current.cart.data).toEqual([]);
  });
});
