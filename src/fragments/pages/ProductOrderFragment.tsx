import { Button } from "@chakra-ui/button";
import { Heading, Stack, Text } from "@chakra-ui/layout";
import axios from "axios";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Order } from "../../domain/Order";
import ProductOrderTable from "../../tables/ProductOrderTable";

interface ProductOrderFragmentProps {}

type ConfirmationPayloadType = {
  id: string;
  status: string;
};

const ProductOrderFragment: React.VFC<ProductOrderFragmentProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, data, error } = useQuery<Order>("findOrder", async () => {
    const { data } = await axios.post(`http://localhost:8080/order/find`, {
      id,
    });
    return data;
  });

  const manageOrderMutation = useMutation(
    (confirmationPayload: ConfirmationPayloadType) =>
      axios.post(
        "http://localhost:8080/order/manageOrder",
        confirmationPayload
      ),
    {
      onSuccess: (variables) => {
        console.log(variables);
      },
    }
  );

  function confirmOrRejectOrder(action: boolean) {
    const payload: ConfirmationPayloadType = {
      id: data!.id!,
      status: action ? "Confirmed" : "Rejected",
    };
    manageOrderMutation.mutate(payload);
  }

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <h1>Error</h1>;
  }
  return (
    <Stack>
      <Heading>Order N°{data?.orderNumber}</Heading>
      <Text>Customer: {data?.customer}</Text>
      <Text fontWeight="bold">Status: {data?.status}</Text>
      <Text>Date: {data?.date}</Text>
      <Button ml={"auto"} w={"25%"} colorScheme="blue" onClick={() => {}}>
        Add product order
      </Button>
      {data === undefined ? null : (
        <ProductOrderTable overview={false} productOrders={data?.items} />
      )}
      {data?.status === "Pending" ? (
        <Stack ml="auto" direction="row">
          <Button
            w={"25%"}
            colorScheme="green"
            onClick={() => {
              confirmOrRejectOrder(true);
            }}
          >
            Confirm order
          </Button>
          <Button
            w={"25%"}
            colorScheme="red"
            onClick={() => {
              confirmOrRejectOrder(false);
            }}
          >
            Reject order
          </Button>
        </Stack>
      ) : null}

      <Stack textAlign="right" fontWeight="bold">
        <Text>Total Taxes: {data!.totalTaxes!.toFixed(2)}</Text>
        <Text>Total: {data!.totalAmount!.toFixed(2)} </Text>
      </Stack>
    </Stack>
  );
};

export default ProductOrderFragment;
