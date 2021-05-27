import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import React from "react";
import { CustomLink } from "../components/CustomLink";
import { Links } from "../link.routes";

interface NavigationBarProps {}

const NavigationBar: React.VFC<NavigationBarProps> = () => {
  return (
    <Stack
      p={4}
      direction="row"
      justifyContent="left"
      alignItems="center"
      spacing={8}
      backgroundColor={"#F8F9FA"}
    >
      <Heading>BLAZE</Heading>
      <Stack direction="row" spacing={2}>
        {Links.map((l, i) => {
          return <CustomLink key={i} title={l.title} to={l.to} />;
        })}
      </Stack>
    </Stack>
  );
};

export default NavigationBar;
