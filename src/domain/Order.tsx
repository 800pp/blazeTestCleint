import { ProductOrder } from "./ProductOrder";

export type Order = {
  id?: string;
  orderNumber?: number;
  status: string;
  date?: number;
  customer: string;
  totalTaxes?: number;
  totalAmount?: number;
  items: ProductOrder[];
};
