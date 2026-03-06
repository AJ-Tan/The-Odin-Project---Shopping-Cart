import "./pageHeader.css";
import CartSvg from "../../assets/cart-icon.svg?react";
import MenuSvg from "../../assets/menu-icon.svg?react";
import imgAvatar from "../../assets/image-avatar.png";
import CartDetails from "./CartDetails/CartDetails";
import type { CartType } from "../hooks/useStore";
import PageNav from "./PageNav/PageNav";
import { useState } from "react";

function PageHeader({ cart }: { cart: CartType }) {
  const [displayCart, setDisplayCart] = useState(false);
  const totalCartItems = cart.totalItems();

  const openMenu = () => {
    const menuBtn = document.querySelector(".btn-menu");
    if (menuBtn instanceof HTMLElement) {
      menuBtn.ariaExpanded = "true";
    }
  };

  const toggleCart = () => {
    if (displayCart === false) setDisplayCart(true);
    const cartDetails = document.querySelector("#cart-details");
    if (cartDetails instanceof HTMLElement) {
      cartDetails.classList.add("close");
      cartDetails.addEventListener(
        "animationend",
        () => {
          cartDetails.classList.remove("close");
          setDisplayCart(false);
        },
        { once: true },
      );
    }
  };

  return (
    <header className="page-header">
      <div className="page-header-wrapper">
        <div className="page-header-left">
          <button
            className="btn-menu btn-clean"
            type="button"
            onClick={openMenu}
            aria-label="Open menu."
            aria-expanded="false"
            aria-controls="main-menu"
          >
            <div className="menu-icon">
              <MenuSvg />
            </div>
          </button>
          <div className="page-brand">
            <h1>CartVariety</h1>
          </div>
          <PageNav />
        </div>
        <div className="page-header-right">
          <button
            className="btn-cart btn-clean"
            type="button"
            aria-label="Toggle display of cart items."
            aria-expanded={displayCart ? "true" : "false"}
            aria-controls="cart-details"
            onClick={toggleCart}
          >
            <div className="cart-icon">
              {totalCartItems > 0 && (
                <div className="cart-icon-total">
                  <span>{totalCartItems}</span>
                </div>
              )}
              <CartSvg />
            </div>
          </button>
          <button className="btn-clean" type="button">
            <div className="user-avatar">
              <img src={imgAvatar} alt="User avatar." />
            </div>
          </button>
          {displayCart && <CartDetails cart={cart} toggleCart={toggleCart} />}
        </div>
      </div>
    </header>
  );
}

export default PageHeader;
