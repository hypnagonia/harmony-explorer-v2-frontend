import React, {useEffect, useState} from 'react';
import {Box} from "grommet";

import { TransactionsTable } from "src/components/tables/TransactionsTable";
import {Filter, InternalTransaction } from "src/types";
import { getInternalTransactionsByField } from 'src/api/client';

interface InternalTransactionListProps {
  hash: string;
}

const initFilter: Filter = {
  offset: 0,
  limit: 10,
  orderBy: "block_number",
  orderDirection: "desc",
  filters: [{ type: "gte", property: "block_number", value: 0 }],
};

export function InternalTransactionList(props: InternalTransactionListProps) {
  const [trxs, setTrxs] = useState<InternalTransaction[]>([]);
  const [filter, setFilter] = useState<Filter>(initFilter);

  const { hash } = props;

  useEffect(() => {
    const getElements = async () => {
      try {
        //TODO прицепить фильтр
        let trxs = await getInternalTransactionsByField([0, 'transaction_hash', hash, filter]);
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
        showIfEmpty
        emptyText={"No Internal Transactions for this hash " + hash}
        limit={+limit}
        filter={filter}
        setFilter={setFilter}
      />
    </Box>
  )
}