import React from "react";
import { Box, Text } from "grommet";
import { Address, formatNumber, TokenValue } from "src/components/ui";
import { Dropdown } from "src/components/dropdown/Dropdown";
import { BinancePairs } from "src/hooks/BinancePairHistoricalPrice";
import Big from "big.js";
import { useERC20Pool } from "src/hooks/ERC20_Pool";
import { useERC721Pool } from "src/hooks/ERC721_Pool";
import { TokenValueBalanced } from "src/components/ui/TokenValueBalanced";
import { useThemeMode } from "src/hooks/themeSwitcherHook";
import { useCurrency } from "src/hooks/ONE-ETH-SwitcherHook";
import { getAddress } from "src/utils/getAddress/GetAddress";
import { useHistory } from "react-router-dom";

interface Token {
  balance: string;
  tokenAddress: string;
  isERC20?: boolean;
  isERC721?: boolean;
  symbol: string;
}

export function TokensInfo(props: { value: Token[] }) {
  const erc20Map = useERC20Pool();
  const erc721Map = useERC721Pool();
  const themeMode = useThemeMode();
  const currency = useCurrency();
  const history = useHistory();

  const { value } = props;

  if (!value.filter((i) => filterWithBalance(i.balance)).length) {
    return <span>—</span>;
  }

  const erc20Tokens = value
    .filter((i) => filterWithBalance(i.balance))
    .filter((i) => i.isERC20)
    .map((item) => ({
      ...item,
      symbol: erc20Map[item.tokenAddress].symbol,
      name: erc20Map[item.tokenAddress].name,
    }))
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  const erc721Tokens = value
    .filter((i) => filterWithBalance(i.balance))
    .filter((i) => i.isERC721)
    .map((item) => ({
      ...item,
      symbol: erc721Map[item.tokenAddress].symbol,
      name: erc721Map[item.tokenAddress].name,
    }));

  const data = [...erc20Tokens, ...erc721Tokens];

  return (
    <Box>
      <Box style={{ width: "550px" }}>
        <Dropdown<Token>
          keyField={"tokenAddress"}
          itemHeight={'47px'}
          searchable={(item, searchText) => {
            const outPutAddress =
              currency === "ONE"
                ? getAddress(item.tokenAddress).bech32
                : item.tokenAddress;

            searchText = searchText.toLowerCase();

            if (item.tokenAddress.toLowerCase().includes(searchText)) {
              return true;
            }

            if (outPutAddress.toLowerCase().includes(searchText)) {
              return true;
            }

            if (item.symbol.toLowerCase().includes(searchText)) {
              return true;
            }

            return false;
          }}
          themeMode={themeMode}
          items={data}
          onClickItem={(item) => {
            history.push(`/address/${item.tokenAddress}`);
          }}
          renderItem={(item) => {
            const symbol =
              erc20Map[item.tokenAddress]?.symbol ||
              erc721Map[item.tokenAddress]?.symbol;

            return (
              <Box
                direction="row"
                style={{
                  width: '100%',
                  flex: "0 0 auto",
                  justifyContent: "space-between",
                }}
                margin={{ bottom: "3px" }}
                gap="medium"
              >
                <Box style={{ flex: "1 1 50%" }}>
                  <Address
                    address={item.tokenAddress}
                    style={{ flex: "1 1 50%" }}
                  />
                  <Text size={"small"} color={"minorText"}>
                    {symbol}
                  </Text>
                </Box>
                <TokenValueBalanced
                  value={item.balance}
                  tokenAddress={item.tokenAddress}
                  style={{ flex: "1 1 50%", wordBreak: "break-word" }}
                />
              </Box>
            );
          }}
          renderValue={() => (
            <Box direction={"row"} style={{ paddingTop: "3px" }}>
              {erc20Tokens.length ? (
                <Box style={{ marginRight: "10px" }} direction={"row"}>
                  HRC20{" "}
                  <Box
                    background={"backgroundBack"}
                    style={{
                      width: "20px",
                      height: "20px",
                      marginLeft: "5px",
                      textAlign: "center",
                      borderRadius: "4px",
                    }}
                  >
                    {erc20Tokens.length}
                  </Box>
                </Box>
              ) : null}
              {erc721Tokens.length ? (
                <Box direction={"row"}>
                  HRC721{" "}
                  <Box
                    background={"backgroundBack"}
                    style={{
                      width: "20px",
                      height: "20px",
                      marginLeft: "5px",
                      textAlign: "center",
                      borderRadius: "4px",
                    }}
                  >
                    {erc721Tokens.length}
                  </Box>
                </Box>
              ) : null}
            </Box>
          )}
          group={[
            {
              groupBy: "isERC20",
              renderGroupItem: () => (
                <Box
                  style={{
                    minHeight: "35px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                  pad={"xsmall"}
                  background={"backgroundBack"}
                >
                  <Text>HRC20 tokens</Text>
                </Box>
              ),
            },
            {
              groupBy: "isERC721",
              renderGroupItem: () => (
                <Box
                  style={{
                    minHeight: "35px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                  pad={"xsmall"}
                  background={"backgroundBack"}
                >
                  <Text>HRC721 tokens</Text>
                </Box>
              ),
            },
          ]}
        />
      </Box>
    </Box>
  );
}

function TokenInfo(props: { value: Token }) {
  const { value } = props;

  return (
    <Box
      direction="row"
      style={{ minWidth: "500px", maxWidth: "550px", flex: "0 0 auto" }}
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
