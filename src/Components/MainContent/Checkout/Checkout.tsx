import { Link, useOutletContext } from "react-router";
import "./checkout.css";
import CheckoutItem from "./CheckoutItem";
import type { CartType, StoreType } from "../../hooks/useStore";
import LoadingContent from "../CommonComponent/LoadingContent/LoadingContent";
import ErrorContent from "../CommonComponent/ErrorContent/ErrorContent";
import CheckoutModal from "./CheckoutModal";

function Checkout() {
  const { store, cart } = useOutletContext<{
    store: StoreType;
    cart: CartType;
  }>();

  if (store.loading) return <LoadingContent />;
  if (store.loadingErr) return <ErrorContent errorMessage={store.loadingErr} />;

  const subTotalAmount = cart.data.reduce(
    (prev, item) => prev + item.price * item.quantity,
    0,
  );
  const discountAmount = subTotalAmount * 0.05;
  const shippingAmount = (subTotalAmount - discountAmount) * 0.15;
  const totalAmount = subTotalAmount - discountAmount + shippingAmount;
  const regexDelimiter = /\B(?=(\d{3})+(?!\d))/g;

  const checkoutModal = () => {
    const modalElement = document.querySelector("#checkout-modal");

    if (modalElement instanceof HTMLDialogElement) {
      modalElement.showModal();
    }
  };

  return (
    <div className="checkout">
      <CheckoutModal />
      <div className="checkout-wrapper">
        <header className="checkout-header">
          <h2>Checkout</h2>
        </header>
        <div className="checkout-content">
          {cart.data.length ? (
            <>
              <ul className="checkout-list">
                {cart.data.map((item) => (
                  <CheckoutItem key={item.id} item={item} />
                ))}
              </ul>
              <section className="checkout-total-section">
                <div className="total-group">
                  <span>Subtotal</span>
                  <span>
                    ${subTotalAmount.toFixed(2).replace(regexDelimiter, ",")}
                  </span>
                </div>
                <div className="total-group">
                  <span>Discount (Voucher - 5%)</span>
                  <span>
                    ${discountAmount.toFixed(2).replace(regexDelimiter, ",")}
                  </span>
                </div>
                <div className="total-group">
                  <span>Shipping (15%)</span>
                  <span>
                    ${shippingAmount.toFixed(2).replace(regexDelimiter, ",")}
                  </span>
                </div>
                <hr />
                <div className="total-group total-amount">
                  <span>Total Amount</span>
                  <span>
                    ${totalAmount.toFixed(2).replace(regexDelimiter, ",")}
                  </span>
                </div>
                <button
                  type="button"
                  className="primary-button"
                  onClick={checkoutModal}
                  aria-controls="checkout-modal"
                >
                  Checkout
                </button>
              </section>
            </>
          ) : (
            <div className="checkout-empty">
              <span>Your cart is currently empty.</span>
              <Link className="primary-button" to="../products">
                Shop now!
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
