import { Product } from "./Product";

export type ProductOrder = {
  id?: string;
  productOrderNumber?: number;
  quantity: number;
  cost?: number;
  product: Product;
};
