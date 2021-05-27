import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { Flex, Link, Text } from "@chakra-ui/layout";
import { RouteLink } from "../link.routes";

type CustomLinkProps = RouteLink & {};

export const CustomLink: React.VFC<CustomLinkProps> = ({ title, to }) => {
  return (
    <>
      <Link to={to} as={RouterLink}>
        <Flex alignItems="center">
          <Text fontSize="md">{title}</Text>
        </Flex>
      </Link>
    </>
  );
};
