import { Button } from "@chakra-ui/button";
import { Stack } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React from "react";
import { CustomLink } from "../components/CustomLink";
import { Product } from "../domain/Product";

interface ProductTableProps {
  products: Product[];
  onOpen: () => void;
  increment: () => void;
  decrement: () => void;
  setProduct: (product: Product) => void;
  totalPage: number;
}

export const ProductTable: React.VFC<ProductTableProps> = ({
  products,
  onOpen,
  setProduct,
  decrement,
  increment,
}) => {
  return (
    <>
      <Table colorScheme="twitter" variant="simple" size="lg">
        <Thead backgroundColor={"#E5E5E5"}>
          <Tr>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th>Unit Price</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((p, i) => {
            return (
              <Tr key={i}>
                <Td>{p.name}</Td>
                <Td>{p.category}</Td>
                <Td>{p.unitPrice}</Td>
                <Td>{p.status ? "Active" : "Inactive"}</Td>
                <Td>
                  <Button
                    variant="ghost"
                    colorScheme="twitter"
                    onClick={() => {
                      setProduct(p);
                      onOpen();
                    }}
                  >
                    edit
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Stack direction="row" spacing={5} w={"40%"}>
        <Button variant="outline" colorScheme="teal" onClick={decrement}>
          Prev
        </Button>
        <Button variant="outline" colorScheme="teal" onClick={increment}>
          Next
        </Button>
      </Stack>
    </>
  );
};
