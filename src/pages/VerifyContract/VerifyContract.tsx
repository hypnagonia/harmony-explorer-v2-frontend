import { Box, Heading, Select, Text, TextArea, TextInput } from "grommet";
import React from "react";
import { BasePage, Button } from "src/components/ui";
import styled from "styled-components";

export interface IVerifyContractState {
  contractAddress: string;
  compiler: string;
  optimizer: string;
  optimizerTimes: string;
  sourceCode: string;
  libraries: string[];
  constructorArguments: string;
  chainType: string;
  contractName: string;
}

const Field = styled(Box)``;

export class VerifyContract extends React.Component<{}, IVerifyContractState> {
  public state: IVerifyContractState = {
    chainType: "Mainnet",
    contractAddress: "",
    compiler: "",
    optimizer: "no",
    optimizerTimes: "",
    sourceCode: "",
    libraries: [],
    constructorArguments: "",
    contractName: "",
  };

  onClickSubmitBtn = () => {
    console.log(this.state);
  };

  render() {
    return (
      <>
        <Heading size="xsmall" margin={{ top: "0" }}>
          Verify Contract
        </Heading>
        <BasePage>
          <Box direction={"column"} width={"800px"}>
            <Field margin={"small"}>
              <Text>Contract Address</Text>
              <TextInput
                placeholder={"ONE contract address"}
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                  this.setState({
                    ...this.state,
                    contractAddress: evt.currentTarget.value,
                  });
                }}
              />
            </Field>

            <Field margin={"small"}>
              <Text>Contract Name</Text>
              <TextInput
                placeholder={"ONE name"}
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                  this.setState({
                    ...this.state,
                    contractName: evt.currentTarget.value,
                  });
                }}
              />
            </Field>

            <Field margin={"small"}>
              <Text>Compiler</Text>
              <TextInput
                placeholder={"Solidity compiler version"}
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                  this.setState({
                    ...this.state,
                    compiler: evt.currentTarget.value,
                  });
                }}
              />
            </Field>

            <Field margin={"small"}>
              <Text>Optimizer</Text>
              <Box direction={"row"}>
                <Select
                  options={["yes", "no"]}
                  value={this.state.optimizer}
                  onChange={({ option }) =>
                    this.setState({ ...this.state, optimizer: option })
                  }
                />
                <TextInput
                  type={"number"}
                  placeholder={"Number of times"}
                  style={{ marginLeft: "5px" }}
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState({
                      ...this.state,
                      optimizerTimes: evt.currentTarget.value,
                    });
                  }}
                />
              </Box>
            </Field>

            <Field margin={"small"}>
              <Text>Chain Type</Text>
              <Select
                options={["Mainnet", "Testnet"]}
                value={this.state.chainType}
                onChange={({ option }) =>
                  this.setState({ ...this.state, chainType: option })
                }
              />
            </Field>

            <Field margin={"small"}>
              <Text>Enter the Solidity Contract Code below</Text>
              <TextArea
                style={{ minHeight: "300px" }}
                onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                  this.setState({
                    ...this.state,
                    sourceCode: evt.currentTarget.value,
                  });
                }}
              />
            </Field>

            <Field margin={"small"}>
              <Text>Contract Library Address</Text>
              <Button
                onClick={() => {
                  const old = this.state.libraries;
                  old.push("");

                  this.setState({
                    ...this.state,
                    libraries: old,
                  });
                }}
              >
                + add one more
              </Button>
              {this.state.libraries.map((value, index) => {
                return (
                  <Field
                    key={index}
                    direction={"row"}
                    align={"center"}
                    margin={"small"}
                  >
                    <Text style={{ marginRight: "10px", minWidth: "150px" }}>
                      Library {index} name
                    </Text>
                    <TextInput
                      onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                        const value = evt.currentTarget.value;
                        const { libraries } = this.state;
                        libraries[index] = value;

                        this.setState({ ...this.state, libraries });
                      }}
                    />
                  </Field>
                );
              })}
            </Field>

            <Field margin={"small"}>
              <Button onClick={this.onClickSubmitBtn}>Submit</Button>
            </Field>
          </Box>
        </BasePage>
      </>
    );
  }
}
