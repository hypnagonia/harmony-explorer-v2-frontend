import React, { useState } from "react";
import { Box, Text } from "grommet";

interface ExpandStringProps {
  value: string;
  maxLength?: number;
}

// @ts-ignore
export const ExpandString = (props: ExpandStringProps) => {
  const [isFull, setIsFull] = useState(false);
  const { value, maxLength = 55 } = props;

  if (value.length < maxLength) {
    return <Text>{value}</Text>;
  }

  return (
    <Box direction="column">
      <Text style={{ wordBreak: "break-all" }}>
        {isFull ? value : `${value.substr(0, 67)}...`}
      </Text>
      <Text
        size="small"
        color="brand"
        style={{
          flex: "0 0 auto",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={() => setIsFull(!isFull)}
      >
        {isFull ? "show less" : "show full"}
      </Text>
    </Box>
  );
};
