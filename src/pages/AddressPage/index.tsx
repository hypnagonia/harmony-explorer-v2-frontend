import React, { useEffect, useState } from "react";
import { Text, Box } from "grommet";
import {
  BasePage,
  BaseContainer,
  Address,
  formatNumber,
  ONEValue,
  RelativeTimer,
} from "src/components/ui";
import { AddressDetails } from "./AddressDetails";
import { getRelatedTransactions, getTransactionByField, getInternalTransactionsByField } from "src/api/client";
import { Filter, RPCTransactionHarmony, RelatedTransaction } from "src/types";
import { useParams } from "react-router-dom";
import { TransactionsTable } from "../../components/tables/TransactionsTable";
import { FormNextLink } from "grommet-icons";
import dayjs from "dayjs";

const initFilter: Filter = {
  offset: 0,
  limit: 10,
  orderBy: "block_number",
  orderDirection: "desc",
  filters: [{ type: "gte", property: "block_number", value: 0 }],
};

export function AddressPage() {
  const [relatedTrxs, setRelatedTrxs] = useState<any[]>([]);
  const [filter, setFilter] = useState<Filter>(initFilter);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // @ts-ignore
  const { id } = useParams();

  useEffect(() => {
    const getElements = async () => {
      try {
        setIsLoading(true);
        let relatedTransactions = await getRelatedTransactions([0, id, filter]);
        const transactionsHashes: string[] = [];
        const internalTransactionsHashes: string[] = [];
        console.log(relatedTransactions);
        let reachedTransactions = await Promise.allSettled(relatedTransactions.map((tx: RelatedTransaction) => {
          if (tx.transactionType === "transaction") {
            return getTransactionByField([0, "hash", tx.transactionHash])
          }
          if (tx.transactionType === "internal_transaction") {
            return getInternalTransactionsByField([0, "transaction_hash", tx.transactionHash])
          }
        }));
        //@ts-ignore
        reachedTransactions = reachedTransactions.map(res => ({...res.value, type: 'transaction' }));
        //@ts-ignore
        // internalTransactions = internalTransactions.map(res => ({...res.value, type: 'internal_transaction' }));
        setIsLoading(false);
        console.log(reachedTransactions);
      } catch (err) {
        console.log(err);
      }
    };
    getElements();
  }, [filter]);
  const { limit = 10 } = filter;

  return (
    <BaseContainer pad={{ horizontal: "0" }}>
      <Text size="xlarge" weight="bold" margin={{ bottom: "medium" }}>
        Address
      </Text>
      <BasePage margin={{ vertical: "0" }} gap="medium">
        <AddressDetails address={{ balance: 123 }} type={"address"} />
        <Text size="xlarge" margin={{ top: "medium" }}>
          Related transactions
        </Text>
        <TransactionsTable
          columns={getColumns({})}
          data={relatedTrxs}
          totalElements={100}
          limit={+limit}
          filter={filter}
          isLoading={isLoading}
          setFilter={setFilter}
        />
      </BasePage>
    </BaseContainer>
  );
}

function getColumns(props: any) {
  const { history } = props;
  return [
    {
      property: "type",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Type
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
      render: (data: any) => (
        <Text
          size="small"
          style={{ cursor: "pointer" }}
          onClick={() => {
            history.push(`/tx/${data.transactionHash}`);
          }}
          color="brand"
        >
          <Address address={data.transactionHash} isShort />
        </Text>
      ),
    },
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
      property: "from",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          From
        </Text>
      ),
      render: (data: RPCTransactionHarmony) => (
        <Text size="12px">
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
        <Text size="12px">
          <Address address={data.to} />
        </Text>
      ),
    },
    // {
    //   property: "value",
    //   header: (
    //     <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
    //       ONEValue
    //     </Text>
    //   ),
    //   render: (data: RPCTransactionHarmony) => (
    //     <Box justify="center">
    //       <ONEValue value={data.value} timestamp={data.timestamp} />
    //     </Box>
    //   ),
    // },
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
