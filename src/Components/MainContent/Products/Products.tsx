import { useOutletContext } from "react-router";
import ProductCard from "./ProductCard";
import "./products.css";
import type { StoreType } from "../../hooks/useStore";

function Products() {
  const { store } = useOutletContext<{ store: StoreType }>();

  return (
    <div className="products">
      <div className="products-wrapper">
        <header className="products-header">
          <h2>Products</h2>
        </header>
        <div className="products-content"></div>
      </div>
    </div>
  );
}

export default Products;
