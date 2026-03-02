import { useEffect, useState } from "react";

type Rating = {
  rate: number;
  count: number;
};

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

type Cart = {
  id: number;
  quantity: number;
};

export default function useStore() {
  const [storeData, setStoreData] = useState<Product[] | null>(null);
  const [storeLoading, setLoading] = useState<boolean>(true);
  const [storeLoadingError, setError] = useState<string | null>(null);
  const [cartData, setCartData] = useState<Cart[] | []>([]);

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

  const _addCart = (id: number, quantity: number): void => {
    setCartData((prev) => [...prev, { id, quantity }]);
  };

  const _incrementCart = (id: number, quantity: number): void => {
    setCartData((prev) =>
      [...prev].map((cart) => {
        if (cart.id !== id) {
          return cart;
        }
        return { ...cart, quantity };
      }),
    );
  };

  const updateCart = (id: number, qty: number) => {
    const found = cartData.find((cart) => cart.id === id);
    if (found === undefined) {
      _addCart(id, qty);
    } else {
      _incrementCart(id, qty);
    }
  };

  const removeCart = (id: number) => {
    setCartData((prev) => [...prev].filter((cart) => cart.id !== id));
  };

  const cart = {
    data: cartData,
    update: updateCart,
    remove: removeCart,
  };

  return {
    store,
    cart,
  };
}
