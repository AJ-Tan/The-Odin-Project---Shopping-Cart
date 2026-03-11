import { useOutletContext } from "react-router";
import type { CartType } from "../../../hooks/useStore";
import "./QuantityInputControls.css";
import { useEffect, useRef } from "react";
import RemoveIcon from "../../../../assets/delete-icon.svg?react";

function QuantityInputControls({ productId }: { productId: number }) {
  const { cart } = useOutletContext<{ cart: CartType }>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cartData = cart.data.find((item) => item.id === productId);

  useEffect(() => {
    if (inputRef.current instanceof HTMLInputElement) {
      inputRef.current.value = (cartData ? cartData.quantity : 0).toString();
    }
  }, [cartData]);

  const updateCart = (id: number, qty: number) => {
    cart.update(id, qty);
  };

  const replaceCart = (id: number, e: React.FocusEvent<HTMLInputElement>) => {
    cart.update(id, Number(e.target.value), true);
  };

  const removeCart = (id: number) => {
    cart.remove(id);
  };

  return (
    <div className="product-controls">
      <button
        type="button"
        className="product-decrement"
        onClick={() => updateCart(productId, -1)}
      >
        -
      </button>
      <input
        ref={inputRef}
        type="number"
        name="product-quantity"
        className="product-quantity"
        min={0}
        onKeyDown={(e) => {
          if (e.key === "-") {
            e.preventDefault();
          } else if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
        onBlur={(e) => replaceCart(productId, e)}
      />
      <button
        type="button"
        className="product-increment"
        onClick={() => updateCart(productId, 1)}
      >
        +
      </button>
      <button
        type="button"
        className="product-remove"
        onClick={() => removeCart(productId)}
      >
        <RemoveIcon />
      </button>
    </div>
  );
}

export default QuantityInputControls;
