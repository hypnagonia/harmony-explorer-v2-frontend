import React from "react";
import { Box, Text } from "grommet";
import { Address, TokenValue } from "src/components/ui";

interface Token {
  balance: string;
  tokenAddress: string;
  isERC20?: boolean;
  isERC721?: boolean;
}

export function TokensInfo(props: { value: Token[] }) {
  const { value } = props;

  if (!value.filter((i) => filterWithBalance(i.balance)).length) {
    return <span>—</span>;
  }

  const erc20Tokens = value
    .filter((i) => filterWithBalance(i.balance))
    .filter((i) => i.isERC20);

  const erc721Tokens = value
    .filter((i) => filterWithBalance(i.balance))
    .filter((i) => i.isERC721);

  return (
    <Box>
      {erc20Tokens.length ? (
        <>
          <Text size="small">HRC20 Tokens:</Text>
          <Box style={{ maxHeight: "40vh", overflowY: "auto" }}>
            {erc20Tokens.map((i) => (
              <TokenInfo key={i.tokenAddress} value={i} />
            ))}
          </Box>
        </>
      ) : null}
      {erc721Tokens.length ? (
        <>
          <Text size="small">HRC721 Tokens:</Text>
          <Box style={{ maxHeight: "40vh", overflowY: "auto" }}>
            {erc721Tokens.map((i) => (
              <TokenInfo key={i.tokenAddress} value={i} />
            ))}
          </Box>
        </>
      ) : null}
    </Box>
  );
}

function TokenInfo(props: { value: Token }) {
  const { value } = props;
  return (
    <Box
      direction="row"
      style={{ minWidth: "690px", maxWidth: "550px", flex: "0 0 auto" }}
      margin={{ bottom: "3px" }}
      gap="medium"
    >
      <Address address={value.tokenAddress} style={{ flex: "1 1 50%" }} />
      <TokenValue
        value={value.balance}
        tokenAddress={value.tokenAddress}
        style={{ flex: "1 1 50%", wordBreak: "break-word" }}
      />
    </Box>
  );
}

function filterWithBalance(balance: string) {
  return !!+balance;
}
