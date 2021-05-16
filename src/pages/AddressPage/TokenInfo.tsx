import React from "react";
import { Box, Text } from "grommet";
import { Address, TokenValue } from "src/components/ui";
import { Erc20, useERC20Pool } from "src/hooks/ERC20_Pool";

interface Token {
  balance: string;
  tokenAddress: string;
}

export function TokensInfo(props: { value: Token[] }) {
  const { value } = props;
  const erc20Map = useERC20Pool();

  if (!value.length) {
    return <span>—</span>;
  }

  return (
    <Box>
      <Text size="small">HRC-20 Tokens:</Text>
      <Box style={{ maxHeight: "40vh", overflowY: "auto" }}>
        {value
          .filter((i) => filterWithBalance(i.balance, erc20Map[i.tokenAddress]))
          .map((i) => (
            <TokenInfo key={i.tokenAddress} value={i} />
          ))}
      </Box>
    </Box>
  );
}

function TokenInfo(props: { value: Token }) {
  const { value } = props;

  return (
    <Box
      direction="row"
      style={{ minWidth: "320px", maxWidth: "380px", flex: "0 0 auto" }}
      margin={{ bottom: "3px" }}
      gap="medium"
    >
      <Address address={value.tokenAddress} style={{ width: "50%" }} />
      <TokenValue value={value.balance} tokenAddress={value.tokenAddress} />
    </Box>
  );
}

function filterWithBalance(balance: string, token: Erc20) {
  if (!balance || !token) {
    return !!+balance;
  }

  return !!+balance;

  // const bi = BigInt(balance) / BigInt(10 ** (token.decimals - 4));
  // console.log(token.name, token.decimals, balance, parseInt(bi.toString()));
  // const v = parseInt(bi.toString()) / 10e8;
}
