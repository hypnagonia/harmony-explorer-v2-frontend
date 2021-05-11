import React from "react";
import { Box, Text } from "grommet";

type TAddressType = "address" | "contract" | "erc20" | "erc721";

interface AddressDetailsProps {
  address: any;
  type: TAddressType;
}

export function AddressDetails(props: AddressDetailsProps) {
  const { type, address = {} } = props;

  const items: string[] = ["balance", 'hash'];

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
      <Text size="small" style={{ flex: "3 1 50%" }}>
        {addressPropertyDisplayNames[name]()}
      </Text>
      <Text size="small" style={{ flex: "1 1 100%", wordBreak: 'break-all' }}>
        {addressPropertyDisplayValues[name](data[name], data)}
      </Text>
    </Box>
  );
}

// const addressPropertyDescriptions = {};

const addressPropertyDisplayNames: Record<string, () => React.ReactNode> = {
  balance: () => "Balance",
  hash: () => "Hash",
};

const addressPropertyDisplayValues: Record<string, (value: any, data: any) => React.ReactNode> = {
  balance: (value) => value,
  hash: (value) => '0x10acb39e40e99af74b32fd7257ff07bad7d13cd5b9428c9601813ed256136c39',
};

