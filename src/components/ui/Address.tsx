import React from "react";

interface IAddress {
  address: string;
  isShort?: boolean;
}

export const Address = (props: IAddress) => {
  const { address, isShort } = props;
  return (
    <span>
      {isShort ? `${address.substr(0, 4)}...${address.substr(-4)}` : address}
    </span>
  );
};
