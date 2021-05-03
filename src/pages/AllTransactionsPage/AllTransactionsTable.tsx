import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { transport } from "src/api/explorer";
import { Box, DataTable, Text, Spinner } from "grommet";
import { Filter, RPCTransactionHarmony } from "src/types";
import { useHistory } from "react-router-dom";
import {
  Address,
  formatNumber,
  RelativeTimer,
  PaginationNavigator,
  PaginationRecordsPerPage,
} from "src/components/ui";

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
      render: (data: RPCTransactionHarmony) => <Text size="small">{0}</Text>,
    },
    {
      property: "hash",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Hash
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => (
        <Address address={data.hash} isShort />
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
          Age
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => (
        <Box direction="row" gap="xsmall">
          <RelativeTimer date={new Date(data.timestamp)} updateInterval={1000} />
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
        <Text size="small">
          {formatNumber(+data.blockNumber)}
        </Text>
      ),
    },
    {
      property: "value",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Value
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => (
        <Text size="small">
          {formatNumber(+data.value)}
        </Text>
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
        <Text size="small">
          {data.gas}
        </Text>
      ),
    },
  ];
}

const initFilter: Filter = {
  offset: 0,
  limit: 10,
  orderBy: "block_number",
  orderDirection: "desc",
  filters: [
     { type: "gte", property: "block_number", value: 0 }
    ],
};

export function AllTransactionsTable() {
  const [blocks, setBlocks] = useState<RPCTransactionHarmony[]>([]);
  const [count, setCount] = useState<number>(0);
  const [filter, setFilter] = useState<Filter>(initFilter);

  const history = useHistory();

  useEffect(() => {
    const getCount = async () => {
      try {
        let res = (await transport("getCount", [0, "transactions"])) || ({} as any);
        setCount(res.count as number);
      } catch (err) {
        console.log(err);
      }
    };

    getCount().then(() => {
      const newFilter = JSON.parse(JSON.stringify(filter)) as Filter;
      const innerFilter = newFilter.filters.find(
        (i) => i.property === "number"
      );
      if (innerFilter && count) {
        innerFilter.value = +count;
      }

      setFilter(newFilter);
    });
  }, []);

  useEffect(() => {
    const getBlocks = async () => {
      try {
        let blocks = await transport("getTransactions", [0, filter]);
        setBlocks(blocks as RPCTransactionHarmony[]);
      } catch (err) {
        console.log(err);
      }
    };
    getBlocks();
  }, [filter]);

  if (!blocks.length) {
    return (
      <Box style={{ height: "700px" }} justify="center" align="center">
        <Spinner />
      </Box>
    );
  }

  const beginValue = blocks[0].blockNumber;
  const endValue = blocks.slice(-1)[0].blockNumber;

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
          <b>{filter.limit}</b> transactions shown
          {/*from <b>#{formatNumber(+endValue)}</b> to{" "}
          <b>#{formatNumber(+beginValue)}</b>*/}
        </Text>
        <PaginationNavigator
          onChange={setFilter}
          filter={filter}
          totalElements={count}
          blocks={blocks}
          property="block_number"
        />
      </Box>
      <DataTable
        className={"g-table-header"}
        style={{ width: "100%" }}
        columns={getColumns({ history })}
        data={blocks}
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
          blocks={blocks}
          onChange={setFilter}
          filter={filter}
          totalElements={count}
          property="number"
        />
      </Box>
    </>
  );
}
