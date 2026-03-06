import { Link, useLocation } from "react-router";
import CloseSvg from "../../../assets/close-icon.svg?react";
import "./pageNav.css";

function PageNav() {
  const location = useLocation();

  const closeMenu = () => {
    if (window.matchMedia("(min-width: 750px").matches) return;
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

  const Links = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Checkout", href: "/checkout" },
  ];

  return (
    <div id="main-menu" className="nav-overlay" onClick={closeMenuFromOverlay}>
      <nav className="page-nav">
        <button className="btn-clean" type="button" onClick={closeMenu}>
          <div className="close-icon">
            <CloseSvg />
          </div>
        </button>
        <ul>
          {Links.map((link) => (
            <li key={link.name}>
              <Link
                className={location.pathname === link.href ? "selected" : ""}
                onClick={closeMenu}
                to={link.href}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default PageNav;
