import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { transport } from "src/api/explorer";
import {Box, DataTable, Spinner, Text} from "grommet";
import { Block } from "src/types";
import { useHistory } from "react-router-dom";
import { formatNumber, RelativeTimer, Address } from "src/components/ui";
import { reintervate } from "src/components/ui/utils";

function getColumns(props: any) {
  const { history } = props;
  return [
    {
      property: "shard",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Shard Id
        </Text>
      ),
      render: (data: Block) => <Text size="small">{0}</Text>,
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
            history.push(`/block/${data.number}`);
          }}
          color="brand"
        >
          {formatNumber(+data.number)}
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
        <Box direction="row" gap="xsmall">
          <Text size="small">
            {dayjs(data.timestamp).format("YYYY-MM-DD, HH:mm:ss")},
          </Text>
          <RelativeTimer date={Date.now()} updateInterval={1000} />
        </Box>
      ),
    },
    {
      property: "miner",
      primaryKey: true,
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Miner
        </Text>
      ),
      render: (data: Block) => <Address address={data.miner} isShort />,
    },
    {
      property: "transactions",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Txs
        </Text>
      ),
      render: (data: Block) => (
        <Text size="small">{data.transactions.length}</Text>
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
  useEffect(() => {
    let tId = 0 as any;
    const exec = async () => {
      try {
        let blocks = await transport("getBlocks", [0, filter]);
        setBlocks(blocks as Block[]);
      } catch (err) {
        console.log(err);
      }
    };

    exec();
    tId = window.setInterval(exec, 3000);

    return () => {
      clearTimeout(tId);
    }
  }, []);

  if (!blocks.length) {
    return (
      <Box style={{ height: "700px" }} justify="center" align="center">
        <Spinner />
      </Box>
    );
  }

  return (
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
  );
}
