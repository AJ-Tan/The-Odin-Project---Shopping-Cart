import useStore from "./useStore";

function StoreTest() {
  const { store, cart } = useStore();

  if (store.loading) return <p>Loading...</p>;
  if (store.loadingErr) return <p>{store.loadingErr}</p>;

  const handleAdd = (id: number) => {
    cart.update(id, 1);
  };
  const handleReduce = (id: number) => {
    cart.update(id, -1);
  };

  return (
    <div className="store">
      <h2>Store Items</h2>
      <ul className="store-items">
        {store.data?.map((item) => (
          <li key={item.id}>
            <span>{item.title}</span>
            <button onClick={() => handleAdd(item.id)}>Add</button>
          </li>
        ))}
      </ul>
      <h2>Cart Items</h2>
      {cart.data.length ? (
        <div>
          <ul className="cart-items">
            {cart.data.map((item) => (
              <li key={item.id}>
                <p>{store.findData(item.id)?.title}</p>
                <span>{item.quantity}</span>
                <button onClick={() => handleAdd(item.id)}>Add</button>
                <button onClick={() => handleReduce(item.id)}>Reduce</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No Items</p>
      )}
    </div>
  );
}

export default StoreTest;
