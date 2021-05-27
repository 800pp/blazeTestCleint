import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { Formik, Form } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { CustomInputField } from "../components/CustomInputField";
import { CustomNumericField } from "../components/CustomNumericField";
import { CustomSelectField } from "../components/CustomSelectField";
import { Product } from "../domain/Product";

interface ProductModalProps {
  product?: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.VFC<ProductModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const editMode = product?.id !== undefined;

  const addProductMutation = useMutation(
    (newProduct: Product) =>
      axios.post(
        editMode
          ? "http://localhost:8080/product/edit"
          : "http://localhost:8080/product",
        newProduct
      ),
    {
      onSuccess: () => {
        onClose();
      },
      onError: () => {},
    }
  );

  const modal = (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{editMode ? "Edit" : "New"} product</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{
            name: "",
            category: "",
            unitPrice: 5.5,
            active: editMode ? product!.status : 1,
          }}
          onSubmit={(values) => {
            console.log(product);
            addProductMutation.mutate({
              id: editMode ? product!.id : "",
              status: values.active === 1,
              ...values,
            });
          }}
        >
          {(props) => (
            <Form>
              <ModalBody>
                <Stack spacing={4}>
                  <Stack direction="row">
                    <CustomInputField
                      name="name"
                      label="Name"
                      placeholder={editMode ? product!.name : "New name"}
                    />
                    <CustomSelectField
                      label="Category"
                      name="category"
                      placeholder="Select a category"
                      options={[
                        { key: "Cookies", value: "Cookies" },
                        { key: "Candies", value: "Candies" },
                        { key: "Cakes", value: "Cakes" },
                        { key: "Dessert", value: "Dessert" },
                        { key: "Drinks", value: "Drinks" },
                      ]}
                    />
                  </Stack>
                  <Stack direction="row">
                    <CustomNumericField
                      name="unitPrice"
                      label="Unit Price"
                      numberHolder={editMode ? product!.unitPrice! : 5.5}
                      changeValue={(e) => props.setFieldValue("unitPrice", e)}
                    />
                    <CustomSelectField
                      label="Status"
                      name="active"
                      placeholder="Select a status"
                      options={[
                        { key: "Active", value: 0 },
                        { key: "Inactive", value: 1 },
                      ]}
                    />
                  </Stack>
                </Stack>
              </ModalBody>

              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme="teal"
                  mr={3}
                  isLoading={addProductMutation.status === "loading"}
                >
                  Agregar
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );

  return <>{modal}</>;
};

export default ProductModal;
