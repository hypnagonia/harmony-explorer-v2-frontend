import React from 'react'
import { Box, Text } from 'grommet'
import { Button } from 'src/components/ui'
import { useHistory } from "react-router-dom";

import {BaseContainer, BasePage } from 'src/components/ui';
import { Metrics } from 'src/components/metrics'
import { LatestBlocksTable } from './LatestBlocksTable';

export function MainPage() {
  const history = useHistory();
  return (
    <BaseContainer pad="0">
      <Metrics />
      <Box direction="row" gap="medium">
        <BasePage style={{ flex: '1 1 50%' }}>
          <Text size="large" weight="bold" margin={{ left: 'small', bottom: 'small' }}>Latest Blocks</Text>
          <LatestBlocksTable />
          <Button margin={{ top: 'medium' }} onClick={() => (history.push('/blocks'))}>VIEW ALL BLOCKS</Button>
        </BasePage>
        <BasePage style={{ flex: '1 1 50%' }}>
          <Text size="large" weight="bold">Latest Transactions</Text>
          <LatestTransactionsTable />
        </BasePage>
      </Box>

    </BaseContainer>
  )
}

function LatestTransactionsTable() {
  return (
    <div>
      tx
    </div>
  )
}