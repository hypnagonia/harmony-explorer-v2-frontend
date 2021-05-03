import React, {useEffect, useState} from 'react';
import {Box} from "grommet";

import { TransactionsTable } from "src/components/tables/TransactionsTable";
import {transport} from "../../api/explorer/ws";
import {Filter, InternalTransaction } from "src/types";

interface InternalTransactionListProps {
  blockHash: string;
}

const initFilter: Filter = {
  offset: 0,
  limit: 10,
  orderBy: "block_number",
  orderDirection: "desc",
  filters: [{ type: "gte", property: "block_number", value: 0 }],
};

// TODO: вызвать правильный метод с правильными фильтрами

export function InternalTransactionList(props: InternalTransactionListProps) {
  const [trxs, setTrxs] = useState<InternalTransaction[]>([]);
  const [filter, setFilter] = useState<Filter>(initFilter);

  const { blockHash } = props;

  useEffect(() => {
    const getElements = async () => {
      try {
        let trxs = await transport("getTransactions", [0, filter]);
        setTrxs(trxs as InternalTransaction[]);
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
        data={trxs}
        totalElements={100}
        limit={+limit}
        filter={filter}
        setFilter={setFilter}
      />
    </Box>
  )
}