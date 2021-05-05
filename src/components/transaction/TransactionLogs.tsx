import React, { useState } from "react";
import { Box, Text } from "grommet";

import { TransactionsTable } from "src/components/tables/TransactionsTable";
import { Filter, InternalTransaction, RPCTransactionHarmony } from "src/types";
import {
  Address,
  formatNumber,
  ONEValue,
  RelativeTimer,
  TransactionType,
} from "src/components/ui";
import { useHistory } from "react-router-dom";
import { getNearestPriceForTimestamp } from 'src/components/ONE_USDT_Rate';

import { FormNextLink } from "grommet-icons";
import dayjs from "dayjs";

interface TransactionLogsProps {
  logs: any[];
  hash: string;
}

export function TransactionLogs(props: TransactionLogsProps) {
  const { logs, hash } = props;
  const history = useHistory();

  return (
    <Box margin={{ top: "medium" }}>
      <TransactionsTable
        data={logs.sort((a, b) => a.logIndex - b.logIndex)}
        columns={getColumns({ history })}
        totalElements={100}
        showIfEmpty
        hidePagination
        hideCounter
        emptyText={"No Logs for this hash " + hash}
        limit={100}
        filter={{} as Filter}
        setFilter={() => {}}
      />
    </Box>
  );
}

function getColumns(props: any) {
  const { history } = props;
  return [
    {
      property: "adress",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Address
        </Text>
      ),
      render: (data: any) => (
        <Text size="small" color="brand">
          <Address address={data.address} />
        </Text>
      ),
    },
    {
      property: "block_number",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Block number
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => {
        return (
          <Text
            size="small"
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push(`/block/${data.blockNumber}`);
            }}
            color="brand"
          >
            {formatNumber(+data.blockNumber)}
          </Text>
        );
      },
    },
    {
      property: "blockHash",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Block Hash
        </Text>
      ),
      render: (data: any) => (
        <Text size="small" color="brand">
          <Address address={data.transactionHash} isShort />
        </Text>
      ),
    },
    {
      property: "transactionHash",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Transaction Hash
        </Text>
      ),
      render: (data: any) => (
        <Text size="small" color="brand">
          <Address address={data.transactionHash} isShort />
        </Text>
      ),
    },
    {
      property: "topics",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Topics
        </Text>
      ),
      render: (data: any) => (
        <Box gap="xsmall" justify="end">
          {data.topics.map((i: string) => <Address key={i} address={i} />)}
        </Box>
      ),
    },
  ];
}
