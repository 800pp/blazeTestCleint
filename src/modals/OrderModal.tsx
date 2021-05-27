import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
  Heading,
  Text,
  Box,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CustomInputField } from "../components/CustomInputField";
import { CustomNumericField } from "../components/CustomNumericField";
import { CustomSelectField } from "../components/CustomSelectField";
import { Order } from "../domain/Order";
import { Product } from "../domain/Product";
import { ProductOrder } from "../domain/ProductOrder";
import ProductOrderTable from "../tables/ProductOrderTable";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OrderModalState {
  selectedProduct: Product;
  productOrder: ProductOrder[];
}

const OrderModal: React.VFC<OrderModalProps> = (props) => {
  const [orderModalState, setOrderModalState] = useState<OrderModalState>({
    selectedProduct: {},
    productOrder: [],
  } as OrderModalState);

  const addOrderMutation = useMutation(
    (thisOrder: Order) => axios.post("http://localhost:8080/order", thisOrder),
    {
      onSuccess: (variables) => {
        console.log(variables);
      },
    }
  );

  const getProductById = useMutation(
    (thisProduct: Product) =>
      axios.post("http://localhost:8080/product/find", thisProduct),
    {
      onSuccess: (variables) => {
        setOrderModalState({
          productOrder: orderModalState.productOrder,
          selectedProduct: variables.data,
        });
      },
    }
  );

  const getAllProducts = useQuery<Product[]>("selectProduct", async () => {
    const { data } = await axios.get("http://localhost:8080/product/");
    return data;
  });

  function closeIT() {
    setOrderModalState({
      selectedProduct: {},
      productOrder: [],
    });
    props.onClose();
  }

  const modal = (
    <Modal size="5xl" isOpen={props.isOpen} onClose={closeIT}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Order</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{
            customer: "",
            quantity: 0,
          }}
          onSubmit={(values) => {
            addOrderMutation.mutate({
              customer: values.customer,
              status: "Pending",
              items: orderModalState.productOrder,
            });
          }}
        >
          {(props) => (
            <Form>
              <ModalBody>
                <CustomInputField
                  name="customer"
                  label="Customer"
                  placeholder="Customer's name"
                />
                <Stack mt={4} direction="row" spacing={4} alignItems="center">
                  <CustomSelectField
                    label="Product"
                    name="product"
                    placeholder="Select a product"
                    options={getAllProducts.data!.map((p) => {
                      return { key: p.name!, value: p.id };
                    })}
                    disabled={getProductById.isLoading}
                    onChange={(e) =>
                      getProductById.mutate({
                        id: e.target.value,
                      })
                    }
                  />
                  <CustomNumericField
                    name="quantity"
                    label="Quantity"
                    numberHolder={0}
                    changeValue={(e) => props.setFieldValue("quantity", e)}
                  />
                  {!getProductById.isLoading ? (
                    <Box minW={"50%"}>
                      <Stack>
                        <Heading size="sm">Unit price:</Heading>
                        <Text>
                          {orderModalState.selectedProduct!.unitPrice}
                        </Text>
                      </Stack>
                      <Stack>
                        <Heading size="sm">Total cost:</Heading>
                        <Text>
                          {props.values.quantity === 0
                            ? "Quantity is not specified!"
                            : `$${
                                orderModalState.selectedProduct!.unitPrice! *
                                props.values.quantity
                              }`}
                        </Text>
                      </Stack>
                    </Box>
                  ) : (
                    <Box h={7} w={7}>
                      <Spinner size="md" />
                    </Box>
                  )}
                </Stack>
                <Button
                  onClick={() => {
                    if (props.values.quantity === 0) {
                      return;
                    }
                    setOrderModalState({
                      ...orderModalState,
                      productOrder: [
                        ...orderModalState.productOrder,
                        {
                          productOrderNumber:
                            orderModalState.productOrder.length + 1,
                          quantity: props.values.quantity,
                          cost:
                            props.values.quantity *
                            orderModalState.selectedProduct!.unitPrice!,
                          product: orderModalState.selectedProduct,
                        },
                      ],
                    });
                  }}
                  justifySelf="right"
                  my={2}
                >
                  Add product
                </Button>
                {orderModalState.productOrder.length === 0 ? null : (
                  <ProductOrderTable
                    overview
                    productOrders={orderModalState.productOrder}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme="teal"
                  mr={3}
                  isLoading={false}
                >
                  Complete order
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );

  if (getAllProducts.isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      {getAllProducts.status !== "success" && getAllProducts.data === undefined
        ? null
        : modal}
    </>
  );
};

export default OrderModal;
