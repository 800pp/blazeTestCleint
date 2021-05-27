import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React from "react";
import { CustomLink } from "../components/CustomLink";
import { Order } from "../domain/Order";

interface OrderTableProps {
  order: Order[];
}

export const OrderTable: React.VFC<OrderTableProps> = ({ order }) => {
  return (
    <>
      <Table colorScheme="twitter" variant="simple" size="lg">
        <Thead backgroundColor={"#E5E5E5"}>
          <Tr>
            <Th>Order Number</Th>
            <Th>Status</Th>
            <Th>Date</Th>
            <Th>Customer</Th>
            <Th>Total Taxes</Th>
            <Th>Total Amount</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {order.map((o, i) => {
            return (
              <Tr key={i}>
                <Td>{o.orderNumber}</Td>
                <Td>{o.status}</Td>
                <Td>{o.date}</Td>
                <Td>{o.customer}</Td>
                <Td isNumeric>{o.totalTaxes!.toFixed(2)}</Td>
                <Td isNumeric>{o.totalAmount!.toFixed(2)}</Td>
                <Td>
                  <CustomLink title="edit" to={`/orders/${o.id}`} />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};
