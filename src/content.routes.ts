import { RouteProps } from "react-router";
import OrdersFragment from "./fragments/pages/OrdersFragment";
import ProductOrderFragment from "./fragments/pages/ProductOrderFragment";
import ProductsFragment from "./fragments/pages/ProductsFragment";

export const routes: RouteProps[] = [
  {
    path: "/",
  },
  {
    path: "/orders",
    component: OrdersFragment,
  },
  {
    path: "/products",
    component: ProductsFragment,
  },
  {
    path: "/orders/:id",
    component: ProductOrderFragment,
  },
];
