import React from 'react';
import { Heading } from 'grommet';
import { BasePage, BaseContainer } from 'src/components/ui';
import { AllTransactionsTable } from './AllTransactionsTable';

export function AllTransactionsPage() {

  return (
    <BaseContainer pad={{ horizontal: '0' }}>
      <Heading size="small" margin={{ bottom: 'medium', top: '0' }}>Transactions</Heading>
      <BasePage>
        <AllTransactionsTable />
      </BasePage>
    </BaseContainer>
  )
}