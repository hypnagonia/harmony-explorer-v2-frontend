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
import {
  getRelatedTransactions,
  getTransactionByField,
  getInternalTransactionsByField,
} from "src/api/client";
import {
  Filter,
  RPCTransactionHarmony,
  RelatedTransaction,
  RelatedTransactionType,
} from "src/types";
import { useParams } from "react-router-dom";
import { TransactionsTable } from "../../components/tables/TransactionsTable";
import { FormNextLink } from "grommet-icons";
import dayjs from "dayjs";

const initFilter: Filter = {
  offset: 0,
  limit: 10,
  orderBy: "number",
  orderDirection: "desc",
  filters: [{ type: "gte", property: "number", value: 0 }],
};

export function AddressPage() {
  const [relatedTrxs, setRelatedTrxs] = useState<any[]>([]);
  const [filter, setFilter] = useState<Filter>(initFilter);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // @ts-ignore
  const { id } = useParams();

  useEffect(() => {
    const getElements = async () => {
      setIsLoading(true);
      try {
        let relatedTransactions = await getRelatedTransactions([0, id]);
        setRelatedTrxs(relatedTransactions);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
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
          columns={getColumns()}
          data={relatedTrxs}
          totalElements={100}
          limit={+limit}
          filter={filter}
          isLoading={isLoading}
          setFilter={setFilter}
          minWidth="1000px"
        />
      </BasePage>
    </BaseContainer>
  );
}

function getColumns() {
  return [
    {
      property: "type",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Type
        </Text>
      ),
      render: (data: RelatedTransaction) => (
        <Text size="small">
          {relatedTxMap[data.transactionType] || data.transactionType}
        </Text>
      ),
    },
    {
      property: "hash",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Hash
        </Text>
      ),
      render: (data: any) => <Address address={data.transactionHash} type="tx" isShort />,
    },
    {
      property: "shard",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Shard
        </Text>
      ),
      render: (data: RelatedTransaction) => (
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
      render: (data: RelatedTransaction) => (
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
      render: (data: RelatedTransaction) => (
        <Text size="12px">
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
      render: (data: RelatedTransaction) => (
        <Box justify="center">
          <ONEValue value={data.value} timestamp={data.timestamp} />
        </Box>
      ),
    },
    {
      property: "timestamp",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Timestamp
        </Text>
      ),
      render: (data: RelatedTransaction) => (
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

const relatedTxMap: Record<RelatedTransactionType, string> = {
  transaction: "Transaction",
  internal_transaction: "Internal Transaction",
  stacking_transaction: "Staking Transaction",
};
