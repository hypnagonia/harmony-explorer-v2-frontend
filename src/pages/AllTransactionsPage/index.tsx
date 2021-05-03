import React, { useEffect, useState } from "react";
import { Heading } from "grommet";
import { BasePage, BaseContainer } from "src/components/ui";
import { TransactionsTable } from "../../components/tables/TransactionsTable";
import { Filter, RPCTransactionHarmony } from "../../types";
import { useHistory } from "react-router";
import { transport } from "../../api/explorer/ws";

const initFilter: Filter = {
  offset: 0,
  limit: 10,
  orderBy: "block_number",
  orderDirection: "desc",
  filters: [{ type: "gte", property: "block_number", value: 0 }],
};

export function AllTransactionsPage() {
  const [trxs, setTrxs] = useState<RPCTransactionHarmony[]>([]);
  const [count, setCount] = useState<number>(0);
  const [filter, setFilter] = useState<Filter>(initFilter);

  const history = useHistory();

  useEffect(() => {
    const getCount = async () => {
      try {
        let res =
          (await transport("getCount", [0, "transactions"])) || ({} as any);
        setCount(res.count as number);
      } catch (err) {
        console.log(err);
      }
    };

    getCount().then(() => {
      const newFilter = JSON.parse(JSON.stringify(filter)) as Filter;
      const innerFilter = newFilter.filters.find(
        (i) => i.property === "block_number"
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
        let trxs = await transport("getTransactions", [0, filter]);
        setTrxs(trxs as RPCTransactionHarmony[]);
      } catch (err) {
        console.log(err);
      }
    };
    getBlocks();
  }, [filter]);

  const { limit = 10 } = filter;

  return (
    <BaseContainer pad={{ horizontal: "0" }}>
      <Heading size="small" margin={{ bottom: "medium", top: "0" }}>
        Transactions
      </Heading>
      <BasePage>
        <TransactionsTable
          data={trxs}
          totalElements={+count}
          limit={+limit}
          filter={filter}
          setFilter={setFilter}
        />
      </BasePage>
    </BaseContainer>
  );
}
