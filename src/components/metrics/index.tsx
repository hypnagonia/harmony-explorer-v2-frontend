import React from 'react'
import { Box, Text } from "grommet"
import { FiatPrice, BasePage } from 'src/components/ui'
import { Ascend } from "grommet-icons";
import {theme} from "../../theme";

const metrics = {
  blockCount: 495255,
  blockLatency: 2.04,
  txCount: 1593,
  onePrice: 0.12,
}

export function Metrics() {
  const { ElectricBlue } = theme?.global?.palette;

  return (
    <BasePage direction="row" wrap justify="between">
      <Metric
        name={'ONE price'}
        value={metrics.onePrice.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
        icon={<Ascend size="32px" color={ElectricBlue} />}
      />
      <Metric
        name={'Block count'}
        value={metrics.blockCount.toLocaleString()}
        icon={<Ascend size="32px" color={ElectricBlue} />}
      />
      <Metric
        name={'Transaction count'}
        value={metrics.txCount.toLocaleString()}
        icon={<Ascend size="32px" color={ElectricBlue} />}
      />
      <Metric
        name={'Block latency'}
        value={`${metrics.blockLatency}s`}
        icon={<Ascend size="32px" color={ElectricBlue} />}
      />
      <Metric
        name={'Shards'}
        value={4}
        icon={<Ascend size="32px" color={ElectricBlue} />}
      />
    </BasePage>
  )
}

interface IMetric {
  icon: React.ReactNode;
  value: string | number;
  name: string;
}

function Metric(props: IMetric) {
  const { icon, value, name } = props;
  return (
    <Box direction="row" pad="small" align="stretch">
      <Box pad={{ left: 'small', right: 'medium' }} justify="center" align="center">
        {icon}
      </Box>
      <Box align="start">
        <Text size="xxlarge" margin={{ bottom: 'xxsmall' }}>{value}</Text>
        <Text size="small">{name}</Text>
      </Box>
    </Box>
  )
}