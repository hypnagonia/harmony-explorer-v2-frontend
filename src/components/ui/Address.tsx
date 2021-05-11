import React, {CSSProperties} from "react";
import { Text } from "grommet";
import { useHistory } from "react-router-dom";

interface IAddress {
  address: string;
  isShort?: boolean;
  type?: 'tx' | 'address';
  style?: CSSProperties;
}

export const Address = (props: IAddress) => {
  const { address, isShort, style, type = 'address' } = props;
  const history = useHistory();

  if (!address) {
    return null;
  }

  return (
    <Text
      size="small"
      color="brand"
      style={{ cursor: "pointer", ...style }}
      onClick={() => history.push(`/${type}/${address}`)}
    >
      {isShort ? `${address.substr(0, 4)}...${address.substr(-4)}` : address}
    </Text>
  );
};
