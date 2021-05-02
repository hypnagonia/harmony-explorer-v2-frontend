import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { transport } from "src/api/explorer";
import { Box, DataTable, Text, Spinner } from "grommet";
import { Block, Filter } from "src/types";
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
      property: "miner",
      primaryKey: true,
      header: (
        <Text color="minorText" style={{ fontWeight: 300 }}>
          Miner
        </Text>
      ),
      render: (data: Block) => <Address address={data.miner} isShort />,
    },
    {
      property: "timestamp",
      header: (
        <Text color="minorText" style={{ fontWeight: 300 }}>
          Timestamp
        </Text>
      ),
      render: (data: Block) => (
        <Text size="small">
          {dayjs(data.timestamp).format("YYYY-MM-DD, HH:mm:ss")}
        </Text>
      ),
    },
    {
      property: "number",
      header: (
        <Text color="minorText" style={{ fontWeight: 300 }}>
          Block
        </Text>
      ),
      render: (data: Block) => (
        <Text
          size="small"
          style={{ cursor: "pointer" }}
          onClick={() => {
            history.push(`/block/${data.number}`);
          }}
          color="brand"
        >
          {formatNumber(+data.number)}
        </Text>
      ),
    },
    {
      property: "shard",
      header: (
        <Text color="minorText" style={{ fontWeight: 300 }}>
          Shard Id
        </Text>
      ),
      render: (data: Block) => (
        <Text size="small">{0}</Text>
      ),
    },
    {
      property: "gasUsed",
      header: (
        <Text color="minorText" style={{ fontWeight: 300 }}>
          Gas Used / Gas Limit
        </Text>
      ),
      render: (data: Block) => (
        <Text size="small">{formatNumber(+data.gasUsed)} / { formatNumber(+data.gasLimit)}</Text>
      ),
    },
    {
      property: "size",
      header: (
        <Text color="minorText" style={{ fontWeight: 300 }}>
          Size
        </Text>
      ),
      render: (data: Block) => (
        <Text size="small">{data.size}</Text>
      ),
    },
    {
      property: "transactions",
      header: (
        <Text color="minorText" style={{ fontWeight: 300 }}>
          Transactions
        </Text>
      ),
      render: (data: Block) => (
        <Text size="small">{data.transactions.length}</Text>
      ),
    },
    {
      property: "age",
      header: (
        <Text color="minorText" style={{ fontWeight: 300 }}>
          Age
        </Text>
      ),
      render: (data: Block) => (
        <RelativeTimer date={Date.now()} updateInterval={1000} />
      ),
      width: "130px",
    },
  ];
}

const initFilter: Filter = {
  offset: 0,
  limit: 10,
  orderBy: "number",
  orderDirection: "desc",
  filters: [{ type: "gt", property: "number", value: 0 }],
};

export function AllBlocksTable() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [count, setCount] = useState<number>(0);
  const [filter, setFilter] = useState<Filter>(initFilter);

  const history = useHistory();

  useEffect(() => {
    const getBlocks = async () => {
      try {
        let blocks = await transport("getBlocks", [0, filter]);
        setBlocks(blocks as Block[]);
      } catch (err) {
        console.log(err);
      }
    };
    getBlocks();
  }, [filter]);

  useEffect(() => {
    const getCount = async () => {
      try {
        let res = (await transport("getCount", [0, "blocks"])) || ({} as any);
        setCount(res.count as number);
      } catch (err) {
        console.log(err);
      }
    };
    getCount();
  }, []);

  if (!blocks.length) {
    return (
      <Box style={{ height: "700px" }} justify="center" align="center">
        <Spinner />
      </Box>
    );
  }

  const beginValue = blocks[0].number;
  const endValue = blocks.slice(-1)[0].number;

  return (
    <>
      <Box direction="row" justify="between" margin={{ bottom: "small" }}>
        <Text margin={{ left: "small" }}>
          <b>{filter.limit}</b> blocks shown, from <b>#{beginValue}</b> to <b>#{endValue}</b>
        </Text>
        <PaginationNavigator
          onChange={setFilter}
          filter={filter}
          totalElements={count}
          property="number"
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
          onChange={setFilter}
          filter={filter}
          totalElements={count}
          property="number"
        />
      </Box>
    </>
  );
}