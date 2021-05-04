import React, {useEffect, useState} from 'react';
import {Box, Text} from "grommet";

import { TransactionsTable } from "src/components/tables/TransactionsTable";
import { Filter, InternalTransaction } from "src/types";
import { getInternalTransactionsByField } from 'src/api/client';
import {Address, ONEValue, TransactionType } from "src/components/ui";

interface InternalTransactionListProps {
  hash: string;
}

const initFilter: Filter = {
  offset: 0,
  limit: 100,
  orderBy: "block_number",
  orderDirection: "desc",
  filters: [{ type: "gte", property: "block_number", value: 0 }],
};

export function InternalTransactionList(props: InternalTransactionListProps) {
  const [trxs, setTrxs] = useState<InternalTransaction[]>([]);
  const [filter, setFilter] = useState<Filter>(initFilter);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { hash } = props;

  useEffect(() => {
    const getElements = async () => {
      try {
        setIsLoading(true);
        let trxs = await getInternalTransactionsByField([0, 'transaction_hash', hash]);
        setTrxs(trxs as InternalTransaction[]);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getElements();
  }, [filter]);

  const { limit = 10 } = filter;

  return (
    <Box margin={{ top: 'medium' }}>
      <TransactionsTable
        columns={getColumns()}
        data={trxs.sort((a, b) => a.index > b.index ? 1 : -1)}
        totalElements={100}
        showIfEmpty
        hidePagination
        isLoading={isLoading}
        emptyText={"No Internal Transactions for this hash " + hash}
        limit={+limit}
        filter={filter}
        setFilter={setFilter}
      />
    </Box>
  )
}

function getColumns(props?: any) {
  return [
    {
      property: "type",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Type
        </Text>
      ),
      render: (data: InternalTransaction) => (
        <Text size="small">
          <TransactionType type={data.type}/>
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
      render: (data: InternalTransaction) => (
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
      render: (data: InternalTransaction) => (
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
      render: (data: InternalTransaction) => (
        <Box justify="center" align="end">
          <ONEValue value={data.value} />
        </Box>
      ),
    },
  ];
}