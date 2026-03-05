import { memo } from "react";
import { Link } from "react-router";
import DeleteIcon from "../../../assets/delete-icon.svg?react";
import "./cartDetails.css";
import type { CartType } from "../../hooks/useStore";

function CartDetails({ cart }: { cart: CartType }) {
  const data = cart.data();

  return (
    <div id="cart-details">
      <header>
        <h2>Cart</h2>
      </header>
      <div className="cart-details-container">
        {data ? (
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
            <Link className="cart-checkout" to="/checkout">
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
