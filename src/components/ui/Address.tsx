import React, { CSSProperties } from "react";
import { Text } from "grommet";
import { useHistory } from "react-router-dom";
import { useERC20Pool } from "src/hooks/ERC20_Pool";
import { getAddress } from "src/utils";
import { useCurrency } from "src/hooks/ONE-ETH-SwitcherHook";

interface IAddress {
  address: string;
  isShort?: boolean;
  type?: "tx" | "address";
  style?: CSSProperties;
  color?: string;
  displayHash?: boolean;
}

export const Address = (props: IAddress) => {
  const {
    address,
    isShort,
    style,
    type = "address",
    color = "brand",
    displayHash,
  } = props;
  const history = useHistory();
  const ERC20Map = useERC20Pool();
  const currency = useCurrency();

  if (!address) {
    return null;
  }

  let parsedName = "";

  if (ERC20Map[address] && !displayHash) {
    parsedName = ERC20Map[address].name;
  }
  let outPutAddress = address;
  try {
    outPutAddress = currency === "ONE" ? getAddress(address).bech32 : address;
  } catch {
    outPutAddress = address;
  }

  return (
    <Text
      size="small"
      color={color}
      style={{
        cursor: "pointer",
        textDecoration: !!parsedName ? "underline" : "none",
        ...style,
      }}
      onClick={() => history.push(`/${type}/${address}`)}
    >
      {parsedName ||
        (isShort
          ? `${outPutAddress.substr(0, 4)}...${outPutAddress.substr(-4)}`
          : outPutAddress)}
    </Text>
  );
};
