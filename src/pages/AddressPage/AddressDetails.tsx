import React from "react";
import { Box, Text } from "grommet";
import {
  Address,
  ExpandString,
  formatNumber,
  ONEValue,
  TokenValue,
} from "src/components/ui";
import { AddressDetails } from "src/types";
import { TokensInfo } from "./TokenInfo";
import { Erc20, useERC20Pool } from "src/hooks/ERC20_Pool";
import { ONEValueDropdown } from "src/components/ui/OneValueDropdown";
import { binanceAddressMap } from "src/config/BinanceAddressMap";

interface AddressDetailsProps {
  address: string;
  contracts: AddressDetails | null;
  sourceCode?: string;
  tokens: any[];
  balance?: string;
}

export function AddressDetailsDisplay(props: AddressDetailsProps) {
  const { address, contracts, sourceCode, tokens, balance } = props;
  const erc20Map = useERC20Pool();

  const erc20Token = erc20Map[address] || null;
  const type = getType(contracts, erc20Token);

  const data = {
    ...contracts,
    ...erc20Token,
    address,
    token: tokens,
    balance,
    sourceCode,
  };

  if (!data) {
    return null;
  }

  const items: string[] = Object.keys(data);

  return (
    <Box>
      {items.sort(sortByOrder).map((i) => (
        //@ts-ignore
        <DetailItem key={i} name={i} data={data} type={type} />
      ))}
    </Box>
  );
}

export const Item = (props: { label: any; value: any }) => {
  return (
    <Box
      direction="row"
      align={"center"}
      margin={{ bottom: "small" }}
      pad={{ bottom: "small" }}
      border={{ size: "xsmall", side: "bottom", color: "border" }}
    >
      <Text
        style={{ width: "20%" }}
        color="minorText"
        size="small"
        margin={{ right: "xsmall" }}
      >
        {props.label}
      </Text>
      <Text style={{ width: "80%", wordBreak: "break-all" }} size="small">
        {props.value}
      </Text>
    </Box>
  );
};

function DetailItem(props: { data: any; name: string; type: TAddressType }) {
  const { data, name, type } = props;

  if (
    !addressPropertyDisplayNames[name] ||
    !addressPropertyDisplayValues[name] ||
    data[name] === null
  ) {
    return null;
  }

  return (
    <Item
      label={addressPropertyDisplayNames[name](data, { type })}
      value={addressPropertyDisplayValues[name](data[name], data, { type })}
    />
  );
}

const addressPropertyDisplayNames: Record<
  string,
  (data: any, options: { type: TAddressType }) => React.ReactNode
> = {
  address: () => {
    return "Address";
  },
  value: () => "Value",
  creatorAddress: () => "Creator",
  // solidityVersion: () => "Solidity version",
  IPFSHash: () => "IPFS hash",
  meta: () => "Meta",
  balance: () => "Balance",
  // bytecode: () => "Bytecode",
  token: () => "Token",
  name: () => "Name",
  symbol: () => "Symbol",
  decimals: () => "Decimals",
  totalSupply: () => "Total Supply",
  holders: () => "Holders",
};

const addressPropertyDisplayValues: Record<
  string,
  (value: any, data: any, options: { type: TAddressType }) => React.ReactNode
> = {
  address: (value, data, options: { type: TAddressType }) => {
    return (
      <>
        <Address address={value} displayHash />
        {binanceAddressMap[value] ? ` (${binanceAddressMap[value]})` : null}
      </>
    );
  },
  value: (value) => <TokenValue value={value} />,
  creatorAddress: (value) => <Address address={value} />,
  // solidityVersion: (value) => value,
  IPFSHash: (value) => value,
  meta: (value) => value,
  // bytecode: (value) => <ExpandString value={value || ""} />,
  balance: (value) => (
    <Box width={"550px"}>
      <ONEValueDropdown value={value} />
    </Box>
  ),
  token: (value) => <TokensInfo value={value} />,
  name: (value) => value,
  symbol: (value) => value,
  decimals: (value) => value,
  totalSupply: (value) => <TokenValue value={value} />,
  holders: (value: string) => formatNumber(+value),
};

function sortByOrder(a: string, b: string) {
  return addressPropertyOrder[a] - addressPropertyOrder[b];
}

const addressPropertyOrder: Record<string, number> = {
  address: 9,
  value: 10,
  balance: 11,
  token: 12,
  creatorAddress: 13,

  name: 20,
  symbol: 21,
  decimals: 22,
  totalSupply: 23,
  holders: 24,

  solidityVersion: 31,
  IPFSHash: 32,
  meta: 33,
  bytecode: 34,
  sourceCode: 34,
};

type TAddressType = "address" | "contract" | "erc20" | "erc721" | "erc1155";

export function getType(
  contracts: AddressDetails | null,
  erc20Token: Erc20
): TAddressType {
  if (!!contracts && !!erc20Token) {
    return "erc20";
  }

  if (!!contracts) {
    return "contract";
  }

  return "address";
}
