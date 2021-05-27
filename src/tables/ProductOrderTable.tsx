import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React from "react";
import { ProductOrder } from "../domain/ProductOrder";

interface ProductOrderTableProps {
  productOrders: ProductOrder[];
  overview: boolean;
}

const ProductOrderTable: React.VFC<ProductOrderTableProps> = ({
  productOrders,
  overview,
}) => {
  return (
    <>
      <Table colorScheme="twitter" variant="simple" size="lg">
        <Thead backgroundColor={"#E5E5E5"}>
          <Tr>
            {overview ? null : <Th>N°</Th>}
            <Th>Name</Th>
            <Th>Quantity</Th>
            {overview ? null : <Th>Unit price</Th>}
            <Th>Cost</Th>
          </Tr>
        </Thead>
        <Tbody>
          {productOrders.map((p, i) => {
            return (
              <Tr key={i}>
                {overview ? null : <Td>{p.productOrderNumber}</Td>}
                <Td>{p.product.name}</Td>
                <Td>{p.quantity}</Td>
                {overview ? null : <Td>{p.product.unitPrice}</Td>}
                <Td> {"$" + p.cost!.toFixed(2)}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

export default ProductOrderTable;
