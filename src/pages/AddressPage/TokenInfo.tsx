import React from 'react';
import {Box, Text} from "grommet";
import { Address, TokenValue } from 'src/components/ui';

interface Token {
  balance: string;
  tokenAddress: string;
}

export function TokensInfo(props: { value: Token[]}) {
  const { value } = props;

  if(!value.length) {
    return <span>--</span>;
  }

  return (
    <Box>
      <Text size="small">ERC-20 Tokens</Text>
      <Box style={{ maxHeight: '40vh', overflowY: 'auto' }}>
        {value.map(i => <TokenInfo key={i.tokenAddress} value={i} />)}
      </Box>
    </Box>
  )
}

function TokenInfo(props: { value: Token }) {
  const { value } = props;

  return (
    <Box direction="row" justify="between" style={{ maxWidth: '305px', flex: '0 0 auto' }} margin={{ bottom: '3px' }}>
      <Address address={value.tokenAddress} />
      <TokenValue value={value.balance} tokenAddress={value.tokenAddress} />
    </Box>
  )
}