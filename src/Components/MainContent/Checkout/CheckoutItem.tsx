import type { CartData } from "../../hooks/useStore";
import QuantityInputControls from "../CommonComponent/QuantityInput/QuantityInputControls";
import "./checkoutItem.css";

function CheckoutItem({ item }: { item: CartData }) {
  return (
    <li className="checkout-item">
      <div className="checkout-item-image-wrapper">
        <img src={item.image} alt={item.title} />
      </div>

      <div className="checkout-item-details">
        <div className="checkout-detail-group">
          <span className="checkout-item-category">{item.category}</span>
          <p className="checkout-item-title">{item.title}</p>
        </div>
        <span className="checkout-item-price">
          Price: ${item.price.toFixed(2)}
        </span>
      </div>
      <div className="checkout-item-controls">
        <div className="checkout-control-group">
          <QuantityInputControls productId={item.id} />
          <div className="checkout-item-remove"></div>
        </div>
        <span className="checkout-item-total">
          Amount: $
          {(item.price * item.quantity)
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      </div>
    </li>
  );
}

export default CheckoutItem;
