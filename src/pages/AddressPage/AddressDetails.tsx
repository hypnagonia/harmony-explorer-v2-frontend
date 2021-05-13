import React from "react";
import { Box, Text } from "grommet";
import { ExpandString } from 'src/components/ui';
import { AddressDetails } from 'src/types';

type TAddressType = "address" | "contract" | "erc20" | "erc721";

interface AddressDetailsProps {
  data: AddressDetails;
  type: TAddressType;
}

export function AddressDetailsDisplay(props: AddressDetailsProps) {
  const { type, data } = props;

  if(!data) {
    return null;
  }

  const items: string[] = Object.keys(data);

  return (
    <Box>
      {items.map((i) => (
        //@ts-ignore
        <DetailItem key={i} name={i} data={data} />
      ))}
    </Box>
  );
}

function DetailItem(props: { data: any; name: string }) {
  const { data, name } = props;

  return (
    <Box
      direction="row"
      margin={{ bottom: "small" }}
      pad={{ bottom: "small" }}
      border={{ size: "xsmall", side: "bottom", color: "border" }}
    >
      <Text style={{ width: '25%' }} color="minorText" margin={{ right: "xsmall" }}>
        {addressPropertyDisplayNames[name]()}
      </Text>
      <Text style={{ width: '75%', wordBreak: 'break-all' }}>
        {addressPropertyDisplayValues[name](data[name], data)}
      </Text>
    </Box>
  );
}

const addressPropertyDisplayNames: Record<string, () => React.ReactNode> = {
  creator_address: () => "Creator",
  solidity_version: () => "Solidity version",
  ipfs_hash: () => "IPFS hash",
  meta: () => "Meta",
  bytecode: () => "Bytecode",
};

const addressPropertyDisplayValues: Record<string, (value: any, data: any) => React.ReactNode> = {
  creator_address: (value) => value,
  solidity_version: (value) => value,
  ipfs_hash: (value) => value,
  meta: (value) => value,
  bytecode: (value) => <ExpandString value={value || ''} />,
};


