import PageLayout from "./Components/PageLayout";
import Home from "./Components/MainContent/Home/Home";
import type { RouteObject } from "react-router";
import Products from "./Components/MainContent/Products/Products";
import Checkout from "./Components/MainContent/Checkout/Checkout";
import App from "./App";
import ErrorPage from "./Components/PageError";

export const routes: RouteObject[] = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <App />,
  },
  {
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
];
