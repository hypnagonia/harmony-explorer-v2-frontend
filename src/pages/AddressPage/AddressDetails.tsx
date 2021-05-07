import React from "react";
import { Box, Text } from "grommet";

type TAddressType = "address" | "contract" | "erc20" | "erc721";

interface AddressDetailsProps {
  address: any;
  type: TAddressType;
}

export function AddressDetails(props: AddressDetailsProps) {
  const { type, address = {} } = props;

  const items: string[] = ["balance"];

  return (
    <Box>
      {items.map((i) => (
        <DetailItem key={i} name={i} data={address} />
      ))}
    </Box>
  );
}

function DetailItem(props: { data: any; name: string }) {
  const { data, name } = props;

  return (
    <Box
      direction="row"
      margin={{ bottom: "small" }}
      pad={{ bottom: "small" }}
      border={{ size: "xsmall", side: "bottom", color: "border" }}
    >
      <Text size="small" style={{ flex: "1 3 100%" }}>
        {addressPropertyDisplayNames[name]()}
      </Text>
      <Text size="small" style={{ flex: "1 1 100%" }}>
        {addressPropertyDisplayValues[name](data[name], data)}
      </Text>
    </Box>
  );
}

// const addressPropertyDescriptions = {};

const addressPropertyDisplayNames: Record<string, () => React.ReactNode> = {
  balance: () => "Balance",
};

const addressPropertyDisplayValues: Record<string, (value: any, data: any) => React.ReactNode> = {
  balance: (value) => value,
};

