import { Outlet } from "react-router";
import PageFooter from "./PageFooter";
import PageHeader from "./PageHeader/PageHeader";
import useStore from "./hooks/useStore";

function PageLayout() {
  const { store, cart } = useStore();

  return (
    <>
      <PageHeader cart={cart} />
      <main>
        <Outlet context={{ store }} />
      </main>
      <PageFooter />
    </>
  );
}

export default PageLayout;
