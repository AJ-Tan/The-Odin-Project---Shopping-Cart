import { Link } from "react-router";
import "./pageHeader.css";
import CartSvg from "../../assets/cart-icon.svg?react";
import MenuSvg from "../../assets/menu-icon.svg?react";
import CloseSvg from "../../assets/close-icon.svg?react";
import imgAvatar from "../../assets/image-avatar.png";

function PageHeader() {
  const openMenu = () => {
    const menuBtn = document.querySelector(".btn-menu");
    if (!menuBtn) return;
    menuBtn.ariaExpanded = "true";
  };

  const closeMenu = () => {
    const pageNav = document.querySelector(".page-nav");
    const menuBtn = document.querySelector(".btn-menu");
    if (!menuBtn) return;
    if (!pageNav) return;
    pageNav.classList.add("close");

    pageNav.addEventListener(
      "animationend",
      () => {
        pageNav.classList.remove("close");
        menuBtn.ariaExpanded = "false";
      },
      { once: true },
    );
  };

  const closeMenuFromOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && e.target.id === "main-menu") {
      closeMenu();
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
            <h1>BRAND</h1>
          </div>
          <div
            id="main-menu"
            className="nav-overlay"
            onClick={closeMenuFromOverlay}
          >
            <nav className="page-nav">
              <button className="btn-clean" type="button" onClick={closeMenu}>
                <div className="close-icon">
                  <CloseSvg />
                </div>
              </button>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="products">Products</Link>
                </li>
                <li>
                  <Link to="Cart">Checkout</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="page-header-right">
          <button
            className="btn-clean"
            type="button"
            aria-label="Show current cart items."
            aria-expanded="false"
            aria-controls=""
          >
            <div className="cart-icon">
              <CartSvg />
            </div>
          </button>
          <button className="btn-clean" type="button">
            <div className="user-avatar">
              <img src={imgAvatar} alt="User avatar." />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

export default PageHeader;
