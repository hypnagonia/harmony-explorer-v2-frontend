import React from "react";
import { Box } from "grommet";

import { theme } from "src/theme";

const sizes = {
  minWidth: "466px",
  maxWidth: "1408px",
};

export const BaseContainer = (props: any) => {
  const { style } = props;

  return (
    <Box
      pad={{ horizontal: "20px" }}
      {...props}
      style={{ ...sizes, width: "100%", flex: "1 1 auto", ...style }}
    />
  );
};

export const BasePage = (props: any) => {
  const { style } = props;

  return (
    <Box
      pad="medium"
      background="background"
      border={{ size: "xsmall", color: "border" }}
      {...props}
      style={{
        borderRadius: "8px",
        ...style,
      }}
    />
  );
};
