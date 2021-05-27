import { Button } from "@chakra-ui/button";
import { Stack, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { Order } from "../../domain/Order";
import OrderModal from "../../modals/OrderModal";
import { OrderTable } from "../../tables/OrderTable";

interface OrdersProps {}

const OrdersFragment: React.VFC<OrdersProps> = () => {
  //Get all Orders
  const getAllOrdersQuery = useQuery<Order[]>("order", async () => {
    const { data } = await axios.get("http://localhost:8080/order/");
    return data;
  });

  //Add Order
  const addOrderMutation = useMutation(
    (newProduct: Order) =>
      axios.post("http://localhost:8080/product", newProduct),
    {
      onSuccess: () => {
        onClose();
      },
      onError: () => {},
    }
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (getAllOrdersQuery.isLoading) {
    return <h1>Loading</h1>;
  }
  if (getAllOrdersQuery.error) {
    <h1>Error</h1>;
  }
  return (
    <Stack direction="column" spacing={4}>
      <Button
        ml={"auto"}
        w={"15%"}
        colorScheme={"green"}
        my={2}
        onClick={onOpen}
      >
        New order
      </Button>
      {getAllOrdersQuery.data === undefined ? null : (
        <OrderTable order={getAllOrdersQuery.data} />
      )}
      <OrderModal isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};

export default OrdersFragment;
