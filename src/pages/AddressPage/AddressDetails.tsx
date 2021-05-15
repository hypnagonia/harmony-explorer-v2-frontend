import React from "react";
import { Box, Text } from "grommet";
import {
  Address,
  ExpandString,
  formatNumber,
  TokenValue,
} from "src/components/ui";
import { AddressDetails } from "src/types";
import { TokensInfo } from "./TokenInfo";

type TAddressType = "address" | "contract" | "erc20" | "erc721";

interface AddressDetailsProps {
  data: AddressDetails;
  type: TAddressType;
}

export function AddressDetailsDisplay(props: AddressDetailsProps) {
  const { type, data } = props;

  if (!data) {
    return null;
  }

  const items: string[] = Object.keys(data);

  return (
    <Box>
      {items.map((i) => (
        //@ts-ignore
        <DetailItem key={i} name={i} data={data} />
      ))}
    </Box>
  );
}

function DetailItem(props: { data: any; name: string }) {
  const { data, name } = props;

  if (
    !addressPropertyDisplayNames[name] ||
    !addressPropertyDisplayValues[name] ||
    data[name] === null
  ) {
    return null;
  }

  return (
    <Box
      direction="row"
      margin={{ bottom: "small" }}
      pad={{ bottom: "small" }}
      border={{ size: "xsmall", side: "bottom", color: "border" }}
    >
      <Text
        style={{ width: "25%" }}
        color="minorText"
        size="small"
        margin={{ right: "xsmall" }}
      >
        {addressPropertyDisplayNames[name]()}
      </Text>
      <Text style={{ width: "75%", wordBreak: "break-all" }} size="small">
        {addressPropertyDisplayValues[name](data[name], data)}
      </Text>
    </Box>
  );
}

const addressPropertyDisplayNames: Record<string, () => React.ReactNode> = {
  address: () => "Address",
  value: () => "Value",
  creatorAddress: () => "Creator",
  solidityVersion: () => "Solidity version",
  IPFSHash: () => "IPFS hash",
  meta: () => "Meta",
  bytecode: () => "Bytecode",
  token: () => "Token",
  name: () => "Name",
  symbol: () => "Symbol",
  decimals: () => "Decimals",
  totalSupply: () => "Total Supply",
  holders: () => "Holders",
};

const addressPropertyDisplayValues: Record<
  string,
  (value: any, data: any) => React.ReactNode
> = {
  value: (value) => <TokenValue value={value} />,
  address: (value) => <Address address={value} />,
  creatorAddress: (value) => value,
  solidityVersion: (value) => value,
  IPFSHash: (value) => value,
  meta: (value) => value,
  bytecode: (value) => <ExpandString value={value || ""} />,
  token: (value) => <TokensInfo value={value} />,
  name: (value) => value,
  symbol: (value) => value,
  decimals: (value) => value,
  totalSupply: (value:string) => formatNumber(+value),
  holders: (value: string) => formatNumber(+value),
};
