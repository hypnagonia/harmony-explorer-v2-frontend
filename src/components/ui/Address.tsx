import React from "react";
import { Text } from "grommet";
import { useHistory } from "react-router-dom";

interface IAddress {
  address: string;
  isShort?: boolean;
}

export const Address = (props: IAddress) => {
  const { address, isShort } = props;
  const history = useHistory();

  if (!address) {
    return null;
  }

  return (
    <Text
      size="small"
      color="brand"
      style={{ cursor: "pointer" }}
      onClick={() => history.push(`/address/${address}`)}
    >
      {isShort ? `${address.substr(0, 4)}...${address.substr(-4)}` : address}
    </Text>
  );
};
