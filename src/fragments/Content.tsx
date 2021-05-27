import { Flex } from "@chakra-ui/layout";

import React from "react";
import { Route, Switch } from "react-router";
import { routes } from "../content.routes";

interface ContentProps {}

const Content: React.VFC<ContentProps> = () => {
  return (
    <Flex justifyContent="center">
      <Switch>
        {routes.map((r, i) => {
          return <Route exact key={i} path={r.path} component={r.component} />;
        })}
      </Switch>
    </Flex>
  );
};

export default Content;
