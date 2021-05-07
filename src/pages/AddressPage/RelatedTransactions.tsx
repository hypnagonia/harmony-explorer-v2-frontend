import React from "react";
import { Box, Text } from "grommet";


interface RelatedTransactionsProps {
  trxs: any[];
}

export function RelatedTransactions(props: RelatedTransactionsProps) {
  const { trxs } = props;

  return (
    <Box>
      {JSON.stringify(trxs)}
    </Box>
  );
}

