import { Outlet } from "react-router";
import PageFooter from "./PageFooter";
import PageHeader from "./PageHeader/PageHeader";

function PageLayout() {
  return (
    <>
      <PageHeader />
      <main>
        <Outlet />
      </main>
      <PageFooter />
    </>
  );
}

export default PageLayout;
