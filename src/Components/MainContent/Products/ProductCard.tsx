import { useOutletContext } from "react-router";
import type { CartType, Product } from "../../hooks/useStore";
import Rating from "../CommonComponent/Rating/Rating";
import "./productCard.css";
import QuantityInputControls from "../CommonComponent/QuantityInput/QuantityInputControls";

function ProductCard({ product }: { product: Product }) {
  const { cart } = useOutletContext<{ cart: CartType }>();
  const cartData = cart.data.find((item) => item.id === product.id);

  const updateCart = (id: number, qty: number) => {
    cart.update(id, qty);
  };

  return (
    <li className="product-card">
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
          <QuantityInputControls productId={product.id} />
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
    </li>
  );
}

export default ProductCard;
