import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { useMediaQuery } from "react-responsive";
import { Box, DataTable, Spinner, Text } from "grommet";
import { Block } from "src/types";
import { useHistory } from "react-router-dom";
import { formatNumber, RelativeTimer } from "src/components/ui";
import { getBlocks } from "src/api/client";

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
      render: (data: Block) => (
        <Text
          size="small"
          onClick={() => history.push(`/blocks/shard/${data.shardNumber}`)}
          style={{ cursor: "pointer" }}
          color={"brand"}
        >
          {data.shardNumber}
        </Text>
      ),
    },
    {
      property: "number",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Height
        </Text>
      ),
      render: (data: Block) => (
        <Text
          size="small"
          style={{ cursor: "pointer" }}
          onClick={() => {
            history.push(`/block/${data.hash}`);
          }}
          color="brand"
        >
          {formatNumber(+data.number)}
        </Text>
      ),
    },
    {
      property: "transactions",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Transactions
        </Text>
      ),
      render: (data: Block) => (
        <Text size="small">
          {data.transactions.length + data.stakingTransactions.length}
        </Text>
      ),
    },
    {
      property: "timestamp",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Timestamp
        </Text>
      ),
      render: (data: Block) => (
        <Box direction="row" justify="end" gap="xsmall">
          {/*<Text size="small">*/}
          {/*  {dayjs(data.timestamp).format("YYYY-MM-DD, HH:mm:ss")},*/}
          {/*</Text>*/}
          <RelativeTimer
            date={data.timestamp}
            updateInterval={1000}
            style={{ textAlign: "right" }}
          />
        </Box>
      ),
    },
  ];
}

const filter = {
  offset: 0,
  limit: 10,
  orderBy: "number",
  orderDirection: "desc",
  value: 0,
  filters: [],
};

export function LatestBlocksTable() {
  const history = useHistory();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const isLess1110 = useMediaQuery({ maxDeviceWidth: "1110px" });
  const availableShards = (process.env
    .REACT_APP_AVAILABLE_SHARDS as string).split(",");

  useEffect(() => {
    let tId = 0 as any;
    const exec = async () => {
      try {
        let blocks = await Promise.all(
          availableShards.map((shardNumber) =>
            getBlocks([+shardNumber, filter])
          )
        );

        const blocksList = blocks.reduce((prev, cur, index) => {
          prev = [
            ...prev,
            ...cur.map((item) => ({
              ...item,
              shardNumber: +availableShards[index],
            })),
          ];
          return prev;
        }, []);

        setBlocks(
          blocksList
            .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
            .slice(0, 10)
        );
      } catch (err) {
        console.log(err);
      }
    };

    exec();
    tId = window.setInterval(exec, 3000);

    return () => {
      clearTimeout(tId);
    };
  }, []);

  if (!blocks.length) {
    return (
      <Box style={{ height: "700px" }} justify="center" align="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <Box style={{ overflow: "auto" }}>
      <DataTable
        className={"g-table-header"}
        style={{ width: "100%", minWidth: "620px" }}
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
    </Box>
  );
}
