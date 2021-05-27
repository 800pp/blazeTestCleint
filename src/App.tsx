import * as React from "react";
import { Box, ChakraProvider, Heading, theme } from "@chakra-ui/react";
import NavigationBar from "./fragments/NavigationBar";
import Content from "./fragments/Content";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box m={10}>
      <NavigationBar />
      <Content />
    </Box>
  </ChakraProvider>
);
