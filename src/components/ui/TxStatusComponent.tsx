import { Box, Text } from "grommet";
import { StatusCritical, Validate } from "grommet-icons";
import React from "react";

export function TxStatusComponent(props: { msg?: string }) {
  const { msg } = props;
  return msg ? (
    <Box direction={"row"} align={"center"}>
      <Box
        align={"center"}
        direction={"row"}
        background="backgroundError"
        style={{ borderRadius: "6px", marginRight: "10px", padding: "3px 8px" }}
      >
        <StatusCritical color={"errorText"} size={"medium"} />
        <Text color={"errorText"} size={"small"} style={{ marginLeft: "5px" }}>
          <b>Error</b>
        </Text>
      </Box>
      <Text color={"errorText"} size={"xsmall"}>
        {msg}
      </Text>
    </Box>
  ) : (
    <Box
      direction={"row"}
      align={"center"}
      background={"backgroundSuccess"}
      style={{ borderRadius: "6px", marginRight: "10px", padding: "3px 8px" }}
    >
      <Validate color={"successText"} size={"medium"} />
      <Text color={"successText"} size={"small"} style={{ marginLeft: "5px" }}>
        <b>Success</b>
      </Text>
    </Box>
  );
}
