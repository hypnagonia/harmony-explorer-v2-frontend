import React, { useEffect, useState } from "react";

import { Box, DataTable, Text, Spinner } from "grommet";
import { Filter, RPCTransactionHarmony } from "src/types";
import { useHistory } from "react-router-dom";
import { FormNextLink } from "grommet-icons";
import {
  Address,
  formatNumber,
  RelativeTimer,
  PaginationNavigator,
  PaginationRecordsPerPage,
  ONEValue,
} from "src/components/ui";
import dayjs from "dayjs";

function getColumns(props: any) {
  const { history } = props;
  return [
    {
      property: "shard",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Shard
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => (
        <Box direction="row" gap="3px" align="center">
          <Text size="small">{0}</Text>
          <FormNextLink size="small" color="brand" style={{ marginBottom: '2px' }} />
          <Text size="small">{0}</Text>
        </Box>
      ),
    },
    {
      property: "hash",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Hash
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => (
        <Text
          size="small"
          style={{ cursor: "pointer" }}
          onClick={() => {
            history.push(`/tx/${data.hash}`);
          }}
          color="brand"
        >
          <Address address={data.hash} isShort />
        </Text>
      ),
    },
    {
      property: "from",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          From
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => (
        <Address address={data.from} isShort />
      ),
    },
    {
      property: "to",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          To
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => (
        <Address address={data.to} isShort />
      ),
    },
    {
      property: "age",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Timestamp
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => (
        <Box direction="row" gap="xsmall">
          <Text size="small">
            {dayjs(data.timestamp).format("YYYY-MM-DD, HH:mm:ss")},
          </Text>
          <RelativeTimer date={data.timestamp} updateInterval={1000} />
        </Box>
      ),
    },
    {
      property: "block_number",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Block number
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => (
        <Text size="small">{formatNumber(+data.blockNumber)}</Text>
      ),
    },
    {
      property: "value",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          ONEValue
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => (
        <Box justify="center">
          <ONEValue value={data.value}/>
        </Box>
      ),
    },
    {
      property: "gas",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Gas
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => (
        <Text size="small">{data.gas}</Text>
      ),
    },
  ];
}

interface TransactionTableProps {
  data: any[];
  totalElements: number;
  limit: number;
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

export function TransactionsTable(props: TransactionTableProps) {
  const history = useHistory();
  const { data, totalElements, limit, filter, setFilter } = props;

  if (!data.length) {
    return (
      <Box style={{ height: "700px" }} justify="center" align="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <>
      <Box
        direction="row"
        justify="between"
        pad={{ bottom: "small" }}
        margin={{ bottom: "small" }}
        border={{ size: "xsmall", side: "bottom", color: "border" }}
      >
        <Text>
          <b>{limit}</b> transactions shown
          {/*from <b>#{formatNumber(+endValue)}</b> to{" "}
          <b>#{formatNumber(+beginValue)}</b>*/}
        </Text>
        <PaginationNavigator
          onChange={setFilter}
          filter={filter}
          totalElements={totalElements}
          elements={data}
          property="block_number"
        />
      </Box>
      <DataTable
        className={"g-table-header"}
        style={{ width: "100%" }}
        columns={getColumns({ history })}
        data={data}
        step={10}
        border={{
          header: {
            color: "brand",
          },
          body: {
            color: "border",
            side: "top",
            size: "1px",
          },
        }}
      />
      <Box direction="row" justify="between" margin={{ top: "medium" }}>
        <PaginationRecordsPerPage filter={filter} onChange={setFilter} />
        <PaginationNavigator
          elements={data}
          onChange={setFilter}
          filter={filter}
          totalElements={totalElements}
          property="number"
        />
      </Box>
    </>
  );
}
