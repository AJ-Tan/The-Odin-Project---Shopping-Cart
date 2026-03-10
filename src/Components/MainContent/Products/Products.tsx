import { useOutletContext } from "react-router";
import ProductCard from "./ProductCard";
import "./products.css";
import type { StoreType } from "../../hooks/useStore";
import LoadingContent from "../CommonComponent/LoadingContent/LoadingContent";
import ErrorContent from "../CommonComponent/ErrorContent/ErrorContent";

function Products() {
  const { store } = useOutletContext<{ store: StoreType }>();

  if (store.loading) return <LoadingContent />;
  if (store.loadingErr) return <ErrorContent errorMessage={store.loadingErr} />;

  return (
    <div className="products">
      <div className="products-wrapper">
        <header className="products-header">
          <h2>Products</h2>
        </header>
        <ul className="products-list">
          {store.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Products;
