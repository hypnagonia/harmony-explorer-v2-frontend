import React, { useEffect, useState } from "react";
import { Text, Box, ColumnConfig } from "grommet";
import {
  BasePage,
  BaseContainer,
  Address,
  ONEValue,
  RelativeTimer,
} from "src/components/ui";
import { AddressDetailsDisplay, getType } from "./AddressDetails";
import {
  getRelatedTransactions,
  getContractsByField,
  getUserERC20Balances,
  getUserERC721Assets,
} from "src/api/client";
import { Filter, RelatedTransaction, RelatedTransactionType } from "src/types";
import { useParams } from "react-router-dom";
import { TransactionsTable } from "../../components/tables/TransactionsTable";
import { FormNextLink } from "grommet-icons";
import dayjs from "dayjs";
import styled, { css } from "styled-components";
import { Erc20, useERC20Pool } from "src/hooks/ERC20_Pool";
import { useERC721Pool } from "src/hooks/ERC721_Pool";

const initFilter: Filter = {
  offset: 0,
  limit: 10,
  orderBy: "block_number",
  orderDirection: "desc",
  filters: [{ type: "gte", property: "block_number", value: 0 }],
};

const Marker = styled.div<{ out: boolean }>`
  border-radius: 2px;
  padding: 5px;

  text-align: center;
  font-weight: bold;

  ${(props) =>
    props.out
      ? css`
          background: rgb(239 145 62);
          color: #fff;
        `
      : css`
          background: rgba(105, 250, 189, 0.8);
          color: #1b295e;
        `};
`;

export function AddressPage() {
  const [contracts, setContracts] = useState<any>(null);
  const [tokens, setTokens] = useState<any>(null);
  const [relatedTrxs, setRelatedTrxs] = useState<RelatedTransaction[]>([]);
  const [filter, setFilter] = useState<Filter>(initFilter);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const erc20Map = useERC20Pool();
  const erc721Map = useERC721Pool();

  //TODO remove hardcode
  // @ts-ignore
  const { id } = useParams();

  useEffect(() => {
    const getElements = async () => {
      setIsLoading(true);
      try {
        let relatedTransactions = await getRelatedTransactions([0, id, filter]);
        setIsLoading(false);
        setRelatedTrxs(relatedTransactions);
      } catch (err) {
        console.log(err);
      }
    };
    getElements();
  }, [filter, id]);

  useEffect(() => {
    const getContracts = async () => {
      try {
        let contracts: any = await getContractsByField([0, "address", id]);

        const mergedContracts = erc721Map[contracts.address]
          ? { ...contracts, ...erc721Map[contracts.address] }
          : contracts;

        setContracts(mergedContracts);
      } catch (err) {
        setContracts(null);
      }
    };
    getContracts();
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
    const erc20Token = erc20Map[id] || null;
    const type = erc721Map[id] ? "erc721" : getType(contracts, erc20Token);
    const data = { ...contracts, ...erc20Token, address: id, token: tokens };

    if (type === "erc20") {
      return `HRC20 ${data.name}`;
    }

    if (type === 'erc721') {
      return `ERC721 ${data.name}`;
    }  

    if (type === "contract") {
      return "Contract";
    }

    return "Address";
  };

  const { limit = 10 } = filter;

  return (
    <BaseContainer pad={{ horizontal: "0" }}>
      <Text size="xlarge" weight="bold" margin={{ bottom: "medium" }}>
        {renderTitle()}
      </Text>
      <BasePage margin={{ vertical: "0" }}>
        <AddressDetailsDisplay
          address={id}
          contracts={contracts}
          tokens={tokens}
        />
        <Text
          size="xlarge"
          margin={{ top: !!contracts ? "medium" : "0", bottom: "small" }}
        >
          Related transactions
        </Text>
        <TransactionsTable
          columns={getColumns(id)}
          data={relatedTrxs}
          totalElements={100}
          limit={+limit}
          filter={filter}
          isLoading={isLoading}
          setFilter={setFilter}
          noScrollTop
          minWidth="1266px"
        />
      </BasePage>
    </BaseContainer>
  );
}

function getColumns(id: string): ColumnConfig<any>[] {
  return [
    {
      property: "type",
      size: "",
      header: (
        <Text
          color="minorText"
          size="small"
          style={{ fontWeight: 300, width: "140px" }}
        >
          Type
        </Text>
      ),
      render: (data: RelatedTransaction) => (
        <Text size="small" style={{ width: "140px" }}>
          {relatedTxMap[data.transactionType] || data.transactionType}
        </Text>
      ),
    },
    {
      property: "hash",
      header: (
        <Text
          color="minorText"
          size="small"
          style={{ fontWeight: 300, width: "95px" }}
        >
          Hash
        </Text>
      ),
      render: (data: any) => (
        <Address address={data.transactionHash} type="tx" isShort />
      ),
    },
    {
      property: "shard",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Shard
        </Text>
      ),
      render: (data: RelatedTransaction) => (
        <Box direction="row" gap="3px" align="center">
          <Text size="small">{0}</Text>
          <FormNextLink
            size="small"
            color="brand"
            style={{ marginBottom: "2px" }}
          />
          <Text size="small">{0}</Text>
        </Box>
      ),
    },
    {
      property: "from",
      header: (
        <Text
          color="minorText"
          size="small"
          style={{ fontWeight: 300, width: "320px" }}
        >
          From
        </Text>
      ),
      render: (data: RelatedTransaction) => (
        <Text size="12px">
          <Address address={data.from} />
        </Text>
      ),
    },
    {
      property: "marker",
      header: <></>,
      render: (data: RelatedTransaction) => (
        <Text size="12px">
          <Marker out={data.from === id}>
            {data.from === id ? "OUT" : "IN"}
          </Marker>
        </Text>
      ),
    },
    {
      property: "to",
      header: (
        <Text
          color="minorText"
          size="small"
          style={{ fontWeight: 300, width: "320px" }}
        >
          To
        </Text>
      ),
      render: (data: RelatedTransaction) => (
        <Text size="12px">
          <Address address={data.to} />
        </Text>
      ),
    },
    {
      property: "value",
      header: (
        <Text
          color="minorText"
          size="small"
          style={{ fontWeight: 300, width: "220px" }}
        >
          ONEValue
        </Text>
      ),
      render: (data: RelatedTransaction) => (
        <Box justify="center">
          <ONEValue value={data.value} timestamp={data.timestamp} />
        </Box>
      ),
    },
    {
      property: "timestamp",
      header: (
        <Text
          color="minorText"
          size="small"
          style={{ fontWeight: 300, width: "120px" }}
        >
          Timestamp
        </Text>
      ),
      render: (data: RelatedTransaction) => (
        <Box direction="row" gap="xsmall" justify="end">
          {/*<Text size="small">*/}
          {/*  {!!data.timestamp*/}
          {/*    ? dayjs(data.timestamp).format("YYYY-MM-DD, HH:mm:ss") + ","*/}
          {/*    : "—"}*/}
          {/*</Text>*/}
          <RelativeTimer
            date={data.timestamp}
            updateInterval={1000}
            style={{ minWidth: "auto" }}
          />
        </Box>
      ),
    },
  ];
}

const relatedTxMap: Record<RelatedTransactionType, string> = {
  transaction: "Transaction",
  internal_transaction: "Internal Transaction",
  stacking_transaction: "Staking Transaction",
};
