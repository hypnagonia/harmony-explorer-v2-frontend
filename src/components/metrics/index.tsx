import React from 'react'
import { Box, Text } from "grommet"
import { FiatPrice, BasePage } from 'src/components/ui'
import { formatNumber } from 'src/components/ui/utils';
import { Ascend } from "grommet-icons";
import styled from 'styled-components';
import {theme} from "../../theme";
import {useONEExchangeRate} from "../../hooks/useONEExchangeRate";

export function Metrics() {
  const { LightGrey } = theme?.global?.palette;

  return (
    <BasePage direction="row" justify="between" margin={{ bottom: 'medium' }}>
      <Box justify="between" pad={{ right: 'medium' }} style={{ height: '140px', flex: '1 1', borderRight: `1px solid ${LightGrey}` }}>
        <ONEPrice />
        <Line horizontal />
        <BlockCount />
      </Box>
      <Box justify="between" pad={{ horizontal: 'medium' }} style={{ height: '140px', flex: '1 1', borderRight: `1px solid ${LightGrey}` }}>
        <ShardCount />
        <Line horizontal />
        <BlockLatency />
      </Box>
      <Box justify="between" pad={{ left: 'medium' }} style={{ height: '140px', flex: '1 1' }}>
        <ONEPrice />
        <Line horizontal />
        <ONEPrice />
      </Box>
    </BasePage>
  )
}

function ONEPrice() {
  const { lastPrice, priceChangePercent } = useONEExchangeRate();

  if(!lastPrice && !priceChangePercent) {
    return <div />;
  }


  return (
    <Box direction="row" align="stretch">
      <Box pad={{ left: 'xsmall', right: 'small' }} justify="center" align="center">
        <Ascend size="32px" color="brand" />
      </Box>
      <Box align="start">
        <Text size="small" color="minorText">{'ONE PRICE'}</Text>
        <Box direction="row" gap="xsmall" align="baseline">
          <Text size="small" weight="bold" >$ {formatNumber(lastPrice)}</Text>
          <Text size="11px" weight="bold" color={priceChangePercent > 0 ? '#2cb32c' : '#d23540'}>
            ({priceChangePercent > 0 ? '+' : ''}{formatNumber(priceChangePercent)}%)
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

function BlockCount() {
  const count = 142945;

  return (
    <Box direction="row" align="stretch">
      <Box pad={{ left: 'xsmall', right: 'small' }} justify="center" align="center">
        <Ascend size="32px" color="brand" />
      </Box>
      <Box align="start">
        <Text size="small" color="minorText">{'TRANSACTIONS COUNT'}</Text>
        <Text size="small" weight="bold" >{formatNumber(count)}</Text>
      </Box>
    </Box>
  )
}

function ShardCount() {
  const count = 4;

  return (
    <Box direction="row" align="stretch">
      <Box pad={{ left: 'xsmall', right: 'small' }} justify="center" align="center">
        <Ascend size="32px" color="brand" />
      </Box>
      <Box align="start">
        <Text size="small" color="minorText">{'SHARDS'}</Text>
        <Text size="small" weight="bold" >{formatNumber(count)}</Text>
      </Box>
    </Box>
  )
}

function BlockLatency() {
  const latency = 2.02;

  return (
    <Box direction="row" align="stretch">
      <Box pad={{ left: 'xsmall', right: 'small' }} justify="center" align="center">
        <Ascend size="32px" color="brand" />
      </Box>
      <Box align="start">
        <Text size="small" color="minorText">{'BLOCK LATENCY'}</Text>
        <Text size="small" weight="bold" >{formatNumber(latency)}s</Text>
      </Box>
    </Box>
  )
}

const Line = styled.div<{ horizontal?: boolean, vertical?: boolean }>`
  display: flex;
  width: ${props => props.horizontal ? '100%' : '1px'};
  height: ${props => props.vertical && !props.horizontal ? '100%' : '1px'};
  background-color:  ${props => props.theme.global.colors.border};
`;
