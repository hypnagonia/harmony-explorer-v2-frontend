import React, { CSSProperties, useEffect, useState } from "react";
import { Text } from "grommet";
import { useHistory } from "react-router-dom";
import { useERC20Pool } from "src/hooks/ERC20_Pool";

interface IAddress {
  address: string;
  isShort?: boolean;
  type?: "tx" | "address";
  style?: CSSProperties;
}

export const Address = (props: IAddress) => {
  const { address, isShort, style, type = "address" } = props;
  const history = useHistory();
  const ERC20Map = useERC20Pool();

  if (!address) {
    return null;
  }

  let parsedName = "";

  if (ERC20Map[address]) {
    parsedName = ERC20Map[address].name;
  }

  return (
    <Text
      size="small"
      color="brand"
      style={{ cursor: "pointer", textDecoration: !!parsedName ? 'underline' : 'none', ...style }}
      onClick={() => history.push(`/${type}/${address}`)}
    >
      {parsedName ||
        (isShort ? `${address.substr(0, 4)}...${address.substr(-4)}` : address)}
    </Text>
  );
};
