import { useEffect, useState } from "react";

type Rating = {
  rate: number;
  count: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

export type StoreType = {
  loading: boolean;
  loadingErr: string | null;
  data: Product[];
  findData: (id: number) => Product | null;
};

type Cart = {
  id: number;
  quantity: number;
};

export type CartData = Product & { quantity: number };

export type CartType = {
  data: CartData[];
  update: (id: number, qty?: number | null, replace?: boolean) => void;
  remove: (id: number) => void;
  totalItems: () => number;
  clearCart: () => void;
};

export default function useStore() {
  const [storeData, setStoreData] = useState<Product[]>([]);
  const [storeLoading, setLoading] = useState<boolean>(true);
  const [storeLoadingError, setError] = useState<string | null>(null);
  const [cartData, setCartData] = useState<Cart[] | []>(
    JSON.parse(localStorage.getItem("cartData") || "[]"),
  );

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error Status: ${res.status}`);
        }
        return res.json();
      })
      .then((res: Product[]) => setStoreData(res))
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          console.log(err);
          setError("An unkown error has occured");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  const findStoreData = (id: number): Product | null => {
    if (Array.isArray(storeData)) {
      return storeData.find((data: { id: number }) => data.id === id) || null;
    }
    return null;
  };

  const store = {
    loading: storeLoading,
    loadingErr: storeLoadingError,
    data: storeData,
    findData: findStoreData,
  };

  const _addCart = (id: number, quantity: number | null): void => {
    setCartData((prev) => [
      ...prev,
      { id, quantity: quantity === null ? 1 : quantity },
    ]);
  };

  const _incrementCart = (
    id: number,
    qty: number | null,
    replace: boolean,
  ): void => {
    setCartData((prev) =>
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
  };

  const updateCart = (
    id: number,
    qty: number | null = null,
    replace: boolean = false,
  ) => {
    const found = cartData.find((cart) => cart.id === id);
    if (found === undefined) {
      _addCart(id, qty);
    } else {
      _incrementCart(id, qty, replace);
    }
    setCartData((prev) => [...prev].filter((cart) => cart.quantity > 0));
  };

  const removeCart = (id: number) => {
    setCartData((prev) => [...prev].filter((cart) => cart.id !== id));
  };

  const getCartAllData = () =>
    cartData.reduce((prev, cart): CartData[] => {
      const product = findStoreData(cart.id)!;
      if (!product) return prev;
      return [...prev, { ...product, id: cart.id, quantity: cart.quantity }];
    }, []);

  const totalItems = (): number => {
    if (!getCartAllData().length) return 0;
    return cartData.reduce((prev, curr) => prev + curr.quantity, 0);
  };

  const clearCart = () => {
    setCartData([]);
  };

  const cart = {
    data: cartData.reduce((prev, cart): CartData[] => {
      const product = findStoreData(cart.id)!;
      if (!product) return prev;
      return [...prev, { ...product, id: cart.id, quantity: cart.quantity }];
    }, []),
    update: updateCart,
    remove: removeCart,
    totalItems,
    clearCart,
  };

  return {
    store,
    cart,
  };
}
