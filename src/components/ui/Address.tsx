import React, { CSSProperties } from "react";
import { Text } from "grommet";
import { useHistory } from "react-router-dom";
import { useERC20Pool } from "src/hooks/ERC20_Pool";
import { getAddress } from "src/utils";
import { useCurrency } from "src/hooks/ONE-ETH-SwitcherHook";
import { useERC721Pool } from "src/hooks/ERC721_Pool";

interface IAddress {
  address: string;
  isShort?: boolean;
  type?: "tx" | "address" | "staking-tx";
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
  const erc721Map = useERC721Pool();
  const currency = useCurrency();

  const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";

  if (!address) {
    return null;
  }

  let parsedName = "";

  if (ERC20Map[address] && !displayHash) {
    parsedName = ERC20Map[address].name;
  }

  if (erc721Map[address] && !displayHash) {
    parsedName = erc721Map[address].name;
  }

  parsedName = address === EMPTY_ADDRESS ? "0x0" : parsedName;

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
        textDecoration:
          address === EMPTY_ADDRESS
            ? "none"
            : !!parsedName
            ? "underline"
            : "none",
        ...style,
      }}
      onClick={
        address === EMPTY_ADDRESS
          ? undefined
          : () => history.push(`/${type}/${address}`)
      }
    >
      {parsedName ||
        (isShort
          ? `${outPutAddress.substr(0, 4)}...${outPutAddress.substr(-4)}`
          : outPutAddress)}
    </Text>
  );
};
