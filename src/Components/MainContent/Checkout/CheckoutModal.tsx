import { useRef } from "react";
import { useNavigate, useOutletContext } from "react-router";
import type { CartType } from "../../hooks/useStore";
import "./checkoutModal.css";

function CheckoutModal() {
  const { cart } = useOutletContext<{ cart: CartType }>();
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const navigate = useNavigate();

  const closeModal = () => {
    if (modalRef.current instanceof HTMLDialogElement) {
      modalRef.current.classList.add("close");

      modalRef.current.addEventListener(
        "animationend",
        () => {
          if (modalRef.current instanceof HTMLDialogElement) {
            modalRef.current.close();
            navigate("../products");
            modalRef.current.classList.remove("close");
            cart.clearCart();
          }
        },
        { once: true },
      );
    }
  };

  return (
    <dialog ref={modalRef} id="checkout-modal">
      <header>
        <h2>Purchase Complete</h2>
      </header>
      <p>Thank you for choosing us!</p>
      <button className="primary-button" onClick={closeModal}>
        Go back
      </button>
    </dialog>
  );
}

export default CheckoutModal;
