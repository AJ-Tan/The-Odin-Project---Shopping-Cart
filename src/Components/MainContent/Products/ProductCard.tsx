import { useOutletContext } from "react-router";
import type { CartType, Product } from "../../hooks/useStore";
import Rating from "../CommonComponent/Rating/Rating";
import "./productCard.css";
import { useEffect, useRef } from "react";

function ProductCard({ product }: { product: Product }) {
  const { cart } = useOutletContext<{ cart: CartType }>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cartData = cart.data().find((item) => item.id === product.id);

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

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={`Image of ${product.title}`} />
      </div>
      <div className="product-details">
        <div className="product-header">
          <span className="product-category">{product.category}</span>
          <span className="product-name">{product.title}</span>
        </div>
        <div className="product-price-rating">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <Rating rating={product.rating} />
        </div>
        {cartData ? (
          <div className="product-controls">
            <button
              type="button"
              className="product-decrement"
              onClick={() => updateCart(product.id, -1)}
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
                }
              }}
              onBlur={(e) => replaceCart(product.id, e)}
            />
            <button
              type="button"
              className="product-increment"
              onClick={() => updateCart(product.id, 1)}
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="product-add-cart"
            onClick={() => updateCart(product.id, 1)}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
