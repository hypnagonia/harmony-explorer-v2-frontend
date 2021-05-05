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
      property: "from",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          From
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => (
        <Text size="small">
          <Address address={data.from} />
        </Text>
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
        <Text size="small">
          <Address address={data.to} />
        </Text>
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
          <ONEValue value={data.value} timestamp={+data.timestamp} />
        </Box>
      ),
    },
    {
      property: "timestamp",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Timestamp
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => (
        <Box direction="row" gap="xsmall" justify="end">
          <Text size="small">
            {dayjs(data.timestamp).format("YYYY-MM-DD, HH:mm:ss")},
          </Text>
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

interface TransactionTableProps {
  data: any[];
  columns?: any[];
  totalElements: number;
  limit: number;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  showIfEmpty?: boolean;
  emptyText?: string;
  hidePagination?: boolean;
  isLoading?: boolean;
  hideCounter?: boolean;
}

export function TransactionsTable(props: TransactionTableProps) {
  const history = useHistory();
  const {
    data,
    totalElements,
    limit,
    filter,
    setFilter,
    showIfEmpty,
    emptyText = "No data to display",
    columns,
    hidePagination,
    isLoading,
    hideCounter,
  } = props;

  if ((!data.length && !showIfEmpty) || isLoading) {
    return (
      <Box style={{ height: "700px" }} justify="center" align="center">
        <Spinner />
      </Box>
    );
  }

  if (!data.length) {
    return (
      <Box style={{ height: "120px" }} justify="center" align="center">
        <Text size="small">{emptyText}</Text>
      </Box>
    );
  }

  return (
    <>
      <Box
        direction="row"
        justify={hidePagination ? "start" : "between"}
        pad={{ bottom: "small" }}
        margin={{ bottom: "small" }}
        border={{ size: "xsmall", side: "bottom", color: "border" }}
      >
        {!hideCounter && (<Text>
          <b>{Math.min(limit, data.length)}</b> transaction
          {data.length !== 1 ? "s" : ""} shown
          {/*from <b>#{formatNumber(+endValue)}</b> to{" "}
          <b>#{formatNumber(+beginValue)}</b>*/}
        </Text>)}
        {!hidePagination && (
          <PaginationNavigator
            onChange={setFilter}
            filter={filter}
            totalElements={totalElements}
            elements={data}
            property="block_number"
          />
        )}
      </Box>
      <DataTable
        className={"g-table-header"}
        style={{ width: "100%" }}
        columns={columns ? columns : getColumns({ history })}
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
      {!hidePagination && (
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
      )}
    </>
  );
}
