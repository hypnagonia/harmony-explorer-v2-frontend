import React, { useEffect, useState } from "react";
import { Box, ColumnConfig, Text } from "grommet";
import { FormNextLink } from "grommet-icons";
import { useParams } from "react-router-dom";
import {
  getRelatedTransactions,
  getRelatedTransactionsByType,
} from "src/api/client";
import { TransactionsTable } from "src/components/tables/TransactionsTable";
import { Address, ONEValue, RelativeTimer } from "src/components/ui";
import { Filter, RelatedTransaction, RelatedTransactionType } from "src/types";
import styled, { css } from "styled-components";
import { TRelatedTransaction } from "src/api/client.interface";

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

function getColumns(id: string): ColumnConfig<any>[] {
  return [
    // {
    //   property: "type",
    //   size: "",
    //   header: (
    //     <Text
    //       color="minorText"
    //       size="small"
    //       style={{ fontWeight: 300, width: "140px" }}
    //     >
    //       Type
    //     </Text>
    //   ),
    //   render: (data: RelatedTransaction) => (
    //     <Text size="small" style={{ width: "140px" }}>
    //       {relatedTxMap[data.transactionType] || data.transactionType}
    //     </Text>
    //   ),
    // },
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
    // {
    //   property: "shard",
    //   header: (
    //     <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
    //       Shard
    //     </Text>
    //   ),
    //   render: (data: RelatedTransaction) => (
    //     <Box direction="row" gap="3px" align="center">
    //       <Text size="small">{0}</Text>
    //       <FormNextLink
    //         size="small"
    //         color="brand"
    //         style={{ marginBottom: "2px" }}
    //       />
    //       <Text size="small">{0}</Text>
    //     </Box>
    //   ),
    // },
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
          style={{ fontWeight: 300, width: "140px" }}
        >
          Timestamp
        </Text>
      ),
      render: (data: RelatedTransaction) => (
        <Box direction="row" gap="xsmall" justify="end">
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

export function Transactions(props: { type: TRelatedTransaction }) {
  const [relatedTrxs, setRelatedTrxs] = useState<RelatedTransaction[]>([]);
  const [filter, setFilter] = useState<Filter>(initFilter);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { limit = 10 } = filter;

  // @ts-ignore
  const { id } = useParams();

  useEffect(() => {
    const getElements = async () => {
      setIsLoading(true);
      try {
        let relatedTransactions = await getRelatedTransactionsByType([
          0,
          id,
          props.type,
          filter,
        ]);
        setIsLoading(false);
        setRelatedTrxs(relatedTransactions);
      } catch (err) {
        console.log(err);
      }
    };
    getElements();
  }, [filter, id, props.type]);

  return (
    <Box style={{ padding: "10px" }}>
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
        hideCounter
      />
    </Box>
  );
}
