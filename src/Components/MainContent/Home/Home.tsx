import { Link, useOutletContext } from "react-router";
import type { StoreType } from "../../hooks/useStore";
import "./home.css";
import Rating from "../CommonComponent/Rating/Rating";
import ErrorContent from "../CommonComponent/ErrorContent/ErrorContent";
import LoadingContent from "../CommonComponent/LoadingContent/LoadingContent";

function Home() {
  const { store } = useOutletContext<{ store: StoreType }>();

  if (store.loading) return <LoadingContent />;
  if (store.loadingErr) return <ErrorContent errorMessage={store.loadingErr} />;

  const storeItem = store.findData(3);
  if (!storeItem) return;

  return (
    <div className="home">
      <div className="home-wrapper">
        <section className="home-image">
          <div className="home-image-wrapper">
            <img src={storeItem.image} alt="" />
          </div>
        </section>
        <section className="home-details">
          <header className="home-header">
            <span className="home-header-eyebrow">BEST SELLING</span>
            <h2 className="home-header-text">{storeItem.title}</h2>
          </header>
          <p className="home-details-description">
            {storeItem.description[0].toUpperCase() +
              storeItem.description.slice(1)}
          </p>
          <div className="home-details-info">
            <div className="details-price">${storeItem.price}</div>
            <Rating rating={storeItem.rating} />
          </div>

          <Link className="primary-button" to="products">
            Shop now!
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Home;
