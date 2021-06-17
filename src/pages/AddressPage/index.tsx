import React, { useEffect, useState } from "react";
import { Text, Tabs, Tab, Box } from "grommet";
import { BasePage, BaseContainer } from "src/components/ui";
import { AddressDetailsDisplay, getType } from "./AddressDetails";
import {
  getContractsByField,
  getUserERC20Balances,
  getUserERC721Assets,
  getTokenERC721Assets,
} from "src/api/client";
import { useParams } from "react-router-dom";
import { useERC20Pool } from "src/hooks/ERC20_Pool";
import { useERC721Pool } from "src/hooks/ERC721_Pool";
import { useERC1155Pool } from "src/hooks/ERC1155_Pool";
import { Transactions } from "./tabs/Transactions";
import {
  IUserERC721Assets,
  TRelatedTransaction,
} from "src/api/client.interface";
import { Inventory } from "./tabs/inventory/Inventory";
import { getAllBalance, getBalance } from "src/api/rpc";
import { ISourceCode, loadSourceCode } from "../../api/explorerV1";
import { AddressDetails } from "../../types";
import { ContractDetails } from "./ContractDetails";
import { ERC1155Icon } from "src/components/ui/ERC1155Icon";
import { getAddress } from "src/utils";
import { useCurrency } from "src/hooks/ONE-ETH-SwitcherHook";

export function AddressPage() {
  const [contracts, setContracts] = useState<AddressDetails | null>(null);
  const [sourceCode, setSourceCode] = useState<ISourceCode | null>(null);
  const [balance, setBalance] = useState<any>([]);
  const [tokens, setTokens] = useState<any>(null);
  const [inventory, setInventory] = useState<IUserERC721Assets[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const erc20Map = useERC20Pool();
  const erc721Map = useERC721Pool();
  const erc1155Map = useERC1155Pool();
  const currency = useCurrency();

  //TODO remove hardcode
  // @ts-ignore
  const { id } = useParams();
  const erc20Token = erc20Map[id] || null;
  let oneAddress = id;

  let type = erc721Map[id] ? "erc721" : getType(contracts, erc20Token);

  if (erc1155Map[id]) {
    type = "erc1155";
  }

  try {
    oneAddress = getAddress(oneAddress).bech32;
  } catch {
    oneAddress = oneAddress;
  }

  useEffect(() => {
    const getActiveIndex = () => {
      setActiveIndex(0);
    };
    getActiveIndex();
  }, [id]);

  useEffect(() => {
    const getBal = async () => {
      let bal: string[] = [];
      try {
        bal = await getAllBalance([id, "latest"]);
      } catch {
        bal = [];
      }

      setBalance(bal);
    };
    getBal();
  }, [id]);

  useEffect(() => {
    if (!!contracts) {
      loadSourceCode(oneAddress)
        .then(setSourceCode)
        .catch(() => setSourceCode(null));
    }
  }, [contracts]);

  useEffect(() => {
    const getContracts = async () => {
      try {
        console.log('test')
        let contracts: any = await getContractsByField([0, "address", id]);

        const mergedContracts: AddressDetails = erc721Map[contracts.address]
          ? { ...contracts, ...erc721Map[contracts.address] }
          : contracts;

        setContracts(mergedContracts);
      } catch (err) {
        setContracts(null);
      }
    };
    getContracts();
  }, [id]);

  useEffect(() => {
    const getInventory = async () => {
      try {
        let inventory = await getTokenERC721Assets([id]);

        setInventory(inventory);
      } catch (err) {
        setInventory([]);
      }
    };
    getInventory();
  }, [id, erc721Map]);

  useEffect(() => {
    const getTokens = async () => {
      try {
        let erc721Tokens = await getUserERC721Assets([id]);
        let tokens = await getUserERC20Balances([id]);

        const erc721BalanceMap = erc721Tokens.reduce((prev, cur) => {
          if (prev[cur.tokenAddress]) {
            prev[cur.tokenAddress]++;
          } else {
            prev[cur.tokenAddress] = 1;
          }

          return prev;
        }, {} as { [token: string]: number });

        setTokens([
          ...tokens.map((token) => ({ ...token, isERC20: true })),
          ...erc721Tokens.map((token) => ({
            ...token,
            balance: erc721BalanceMap[token.tokenAddress].toString(),
            isERC721: true,
          })),
        ]);
      } catch (err) {
        setTokens(null);
      }
    };
    getTokens();
  }, [id]);

  const renderTitle = () => {
    const erc1155 = erc1155Map[id] || {};
    const { meta = {}, ...restErc1155 } = erc1155;
    const data = {
      ...contracts,
      ...erc20Token,
      address: id,
      token: tokens,
      ...meta,
    };

    if (type === "erc20") {
      return `HRC20 ${data.name}`;
    }

    if (type === "erc721") {
      return `ERC721 ${data.name}`;
    }

    if (type === "erc1155") {
      const title = `ERC1155 ${data.name || ""}`;
      return meta.image ? (
        <Box direction={"row"} align={"center"}>
          <ERC1155Icon imageUrl={meta.image} />
          &nbsp;
          {title}
        </Box>
      ) : (
        title
      );
    }

    if (type === "contract") {
      return "Contract";
    }

    return "Address";
  };

  const tabs: TRelatedTransaction[] = [
    "transaction",
    "staking_transaction",
    "internal_transaction",
    "erc20",
    "erc721",
    "erc1155",
  ];

  return (
    <BaseContainer pad={{ horizontal: "0" }}>
      <Text size="xlarge" weight="bold" margin={{ bottom: "medium" }}>
        {renderTitle()}
      </Text>
      <BasePage margin={{ vertical: "0" }} style={{ overflow: "inherit" }}>
        <AddressDetailsDisplay
          address={id}
          contracts={contracts}
          tokens={tokens}
          balance={balance}
        />
      </BasePage>
      <BasePage margin={{ top: "15px" }}>
        <Tabs
          alignControls="start"
          justify="start"
          activeIndex={activeIndex}
          onActive={(newActive) => setActiveIndex(newActive)}
        >
          <Tab title={<Text size="small">Transactions</Text>}>
            <Transactions type={"transaction"} />
          </Tab>

          <Tab title={<Text size="small">Staking</Text>}>
            <Transactions type={"staking_transaction"} />
          </Tab>

          <Tab title={<Text size="small">Internal</Text>}>
            <Transactions type={"internal_transaction"} />
          </Tab>

          <Tab title={<Text size="small">HRC20 Transfers</Text>}>
            <Transactions type={"erc20"} />
          </Tab>

          <Tab title={<Text size="small">NFT Transfers</Text>}>
            <Transactions type={"erc721"} />
          </Tab>

          {type === "erc721" && inventory.length ? (
            <Tab
              title={<Text size="small">Inventory ({inventory.length})</Text>}
            >
              <Inventory inventory={inventory} />
            </Tab>
          ) : null}

          {!!contracts ? (
            <Tab title={<Text size="small">Contract</Text>}>
              <ContractDetails
                address={id}
                contracts={contracts}
                sourceCode={sourceCode}
              />
            </Tab>
          ) : null}

          {/*{type === "erc1155" && inventory.length ? (*/}
          {/*  <Tab*/}
          {/*    title={<Text size="small">Inventory ({inventory.length})</Text>}*/}
          {/*  >*/}
          {/*    <Inventory inventory={inventory} />*/}
          {/*  </Tab>*/}
          {/*) : null}*/}
        </Tabs>
      </BasePage>
    </BaseContainer>
  );
}
