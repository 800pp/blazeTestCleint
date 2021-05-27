export interface RouteLink {
  to: string;
  title: string;
}

export const Links: RouteLink[] = [
  {
    to: "/orders",
    title: "Orders",
  },
  {
    to: "/products",
    title: "Products",
  },
];
