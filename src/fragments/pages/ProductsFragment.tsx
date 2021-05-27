import React, { useState } from "react";
import axios from "axios";
import { Product } from "../../domain/Product";
import { ProductTable } from "../../tables/ProductTable";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import ProductModal from "../../modals/ProductModal";
import { Stack } from "@chakra-ui/layout";
import { PagingResult } from "../../domain/helpers/PagingResult";
import { useQuery, useQueryClient } from "react-query";

interface ProductsProps {}

interface ProductFragmentState {
  product: Product;
  counter: number;
}

const ProductsFragment: React.FC<ProductsProps> = () => {
  const { data } = useQuery<PagingResult<Product>>("products", async () => {
    const { data } = await axios.get(
      "http://localhost:8080/product/search?isAscending=false&pageNo=" +
        String(productFragmentState.counter)
    );
    return data;
  });

  const [productFragmentState, setProductFragmentState] =
    useState<ProductFragmentState>({
      product: {},
      counter: 0,
    });

  function increment() {
    if (productFragmentState.counter < data!.totalPage) {
      setProductFragmentState({
        ...productFragmentState,
        counter: productFragmentState.counter + 1,
      });
    }
  }

  function decrement() {
    if (productFragmentState.counter > 0) {
      setProductFragmentState({
        ...productFragmentState,
        counter: productFragmentState.counter - 1,
      });
    }
  }

  function changeProduct(product: Product) {
    setProductFragmentState({ ...productFragmentState, product: product });
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack direction="column" spacing={4}>
      <Button
        ml="auto"
        w={"20%"}
        colorScheme={"green"}
        my={2}
        onClick={() => {
          changeProduct({});
          onOpen();
        }}
      >
        New Product
      </Button>
      {data === undefined ? (
        <h1>no data</h1>
      ) : (
        <ProductTable
          onOpen={onOpen}
          products={data.page}
          setProduct={changeProduct}
          totalPage={data.totalPage}
          decrement={decrement}
          increment={increment}
        />
      )}
      <ProductModal
        isOpen={isOpen}
        onClose={onClose}
        product={productFragmentState.product}
      />
    </Stack>
  );
};

export default ProductsFragment;
