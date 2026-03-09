import { memo, useEffect, useRef } from "react";
import { Link } from "react-router";
import DeleteIcon from "../../../assets/delete-icon.svg?react";
import "./cartDetails.css";
import type { CartType } from "../../hooks/useStore";

function CartDetails({
  cart,
  toggleCart,
}: {
  cart: CartType;
  toggleCart: () => void;
}) {
  const data = cart.data();
  const cartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        toggleCart();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleCart]);

  return (
    <div ref={cartRef} id="cart-details">
      <header>
        <h2>Cart</h2>
        <span className="cart-details-total">
          Total: $
          {data
            .reduce((prev, item) => prev + item.price * item.quantity, 0)
            .toFixed(2)}
        </span>
      </header>
      <div className="cart-details-container">
        {data.length > 0 ? (
          <div className="cart-details-content">
            <ul className="cart-list">
              {data.map((item) => (
                <li key={item.id}>
                  <div className="cart-item-image">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="cart-item-details">
                    <span className="cart-item-name">{item.title}</span>
                    <span className="cart-item-amount-details">
                      <span>${item.price}</span> x <span>{item.quantity}</span>{" "}
                      <b>${(item.price * item.quantity).toFixed(2)}</b>
                    </span>
                  </div>
                  <button
                    className="btn-clean"
                    type="button"
                    aria-label="Remove cart item."
                  >
                    <div className="cart-item-delete">
                      <DeleteIcon />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            <Link
              className="primary-button"
              to="/checkout"
              onClick={toggleCart}
            >
              Checkout
            </Link>
          </div>
        ) : (
          <div className="cart-details-empty">
            <p>Your cart is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(CartDetails);
