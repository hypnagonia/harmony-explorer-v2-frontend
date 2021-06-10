import React from "react";
import {Box, Text} from "grommet";
import { AddressDetails } from "src/types";
import { Item } from "./AddressDetails";
import { useHistory } from "react-router-dom";

interface ContractDetailsProps {
  address: string;
  contracts: AddressDetails;
  sourceCode?: string;
}

export const ContractDetails = (props: ContractDetailsProps) => {
  const history = useHistory();

  if (!props.contracts) {
    return null;
  }

  return (
    <Box style={{ padding: "10px" }} margin={{ top: "medium" }}>
      <Box direction="column" gap="30px">
        <Box direction="row" gap="5px">
          Are you the contract creator?<Text
            size="small"
            style={{ cursor: "pointer" }}
            onClick={() => history.push(`/verifycontract`)}
            color="brand"
        >
          Verify and Publish
        </Text> your contract source code today!
        </Box>

        <Box direction="column">
          <Item
            label="Solidity version"
            value={props.contracts.solidityVersion}
          />
          <Item
            label="Bytecode"
            value={
              <textarea readOnly={true} rows={20} cols={100}>
                {props.contracts.bytecode || ""}
              </textarea>
            }
          />
          {/*<ExpandString value={props.contracts.bytecode || ""} />*/}
        </Box>
      </Box>
    </Box>
  );
};
