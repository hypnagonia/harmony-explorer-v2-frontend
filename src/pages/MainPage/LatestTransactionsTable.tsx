import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { transport } from "src/api/explorer";
import {Box, DataTable, Spinner, Text} from "grommet";
import { RPCTransactionHarmony, Transaction } from "src/types";
import { useHistory } from "react-router-dom";
import { formatNumber, RelativeTimer, Address } from "src/components/ui";

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
          <RelativeTimer date={new Date(data.timestamp)} updateInterval={1000} />
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
        <Text size="small">
          {data.gas}
        </Text>
      ),
    },
  ];
}

const filter = {
  offset: 0,
  limit: 10,
  orderBy: "block_number",
  orderDirection: "desc",
  value: 0,
  filters: [],
};

export function LatestTransactionsTable() {
  const history = useHistory();
  const [transactions, setTransactions] = useState<RPCTransactionHarmony[]>([]);
  useEffect(() => {
    let tId = 0 as any;
    const exec = async () => {
      try {
        let trxs = await transport("getTransactions", [0, filter]);
        setTransactions(trxs as RPCTransactionHarmony[]);
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

  if (!transactions.length) {
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
      data={transactions}
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
