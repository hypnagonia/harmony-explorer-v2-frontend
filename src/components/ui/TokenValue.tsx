
import { Text } from "grommet";
import React from "react";

import { useERC20Pool } from "src/hooks/ERC20_Pool";

interface ONEValueProps {
  value: string | number;
  tokenAddress?: string;
}

// @ts-ignore
export const TokenValue = (props: ONEValueProps) => {
  const { value, tokenAddress = "" } = props;
  const erc20Map = useERC20Pool();
  //TODO remove hardcode
  const tokenInfo = erc20Map[tokenAddress] || { decimals: 14, symbol: '' };

  if (!value) {
    return null;
  }

  const bi = BigInt(value) / BigInt(10 ** tokenInfo.decimals);
  const v = parseInt(bi.toString()) / 10000;

  return <Text size="small"><b>{v.toString()}</b> {tokenInfo.symbol}</Text>;
};
