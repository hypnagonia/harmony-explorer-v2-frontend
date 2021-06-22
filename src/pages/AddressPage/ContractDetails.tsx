import React from "react";
import { Box, Text } from "grommet";
import { AddressDetails } from "src/types";
import { Item } from "./AddressDetails";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ISourceCode } from "../../api/explorerV1";

const StyledTextArea = styled("textarea")`
  padding: 0.75rem;
  border: 1px solid #e7eaf3;
  background-color: #f8f9fa;
  border-radius: 0.35rem;
`;

export const ContractDetails = (props: {
  address: string;
  contracts?: AddressDetails | null;
  sourceCode?: ISourceCode | null;
}) => {
  if (!!props.sourceCode) {
    return (
      <VerifiedContractDetails
        sourceCode={props.sourceCode}
        contracts={props.contracts}
      />
    );
  }

  if (!!props.contracts) {
    return <NoVerifiedContractDetails contracts={props.contracts} />;
  }

  return null;
};

export const NoVerifiedContractDetails = (props: {
  contracts: AddressDetails;
}) => {
  const history = useHistory();

  return (
    <Box style={{ padding: "10px" }} margin={{ top: "medium" }}>
      <Box direction="column" gap="30px">
        <Box direction="row" gap="5px">
          Are you the contract creator?
          <Text
            size="small"
            style={{ cursor: "pointer" }}
            onClick={() => history.push(`/verifycontract`)}
            color="brand"
          >
            Verify and Publish
          </Text>{" "}
          your contract source code today!
        </Box>

        <Box direction="column">
          <Item
            label="Solidity version"
            value={props.contracts.solidityVersion}
          />
          {props.contracts.IPFSHash ? (
            <Item label="IPFS hash" value={props.contracts.IPFSHash} />
          ) : null}
          <Item
            label="Bytecode"
            value={
              <StyledTextArea readOnly={true} rows={15} cols={100}>
                {props.contracts.bytecode || ""}
              </StyledTextArea>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export const VerifiedContractDetails = (props: {
  sourceCode: ISourceCode;
  contracts?: AddressDetails | null;
}) => {
  if (!props.sourceCode) {
    return null;
  }

  return (
    <Box style={{ padding: "10px" }} margin={{ top: "medium" }}>
      <Box direction="column" gap="30px">
        <Box direction="column">
          <Item label="Contract Name" value={props.sourceCode.contractName} />
          <Item label="Compiler Version" value={props.sourceCode.compiler} />
          <Item
            label="Optimization Enabled"
            value={
              props.sourceCode.optimizer ||
              "No" +
                (Number(props.sourceCode.optimizerTimes)
                  ? ` with ${props.sourceCode.optimizerTimes} runs`
                  : "")
            }
          />
          <Item
            label="Contract Source Code Verified"
            value={
              <StyledTextArea readOnly={true} rows={15} cols={100}>
                {props.sourceCode.sourceCode || ""}
              </StyledTextArea>
            }
          />
          {props.contracts ? (
            <Item
              label="Bytecode"
              value={
                <StyledTextArea readOnly={true} rows={15} cols={100}>
                  {props.contracts.bytecode || ""}
                </StyledTextArea>
              }
            />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};
