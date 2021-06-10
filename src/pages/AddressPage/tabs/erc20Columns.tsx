import { Box, ColumnConfig, Text } from 'grommet'
import { Address, TokenValue, RelativeTimer } from 'src/components/ui'
import { RelatedTransaction } from 'src/types'
import React from 'react'
import { parseSuggestedEvent } from 'src/web3/parseByteCode'
import styled, { css } from 'styled-components'

const erc20TransferTopic =
  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'

const memo = (f: Function) => {
  const cache: Record<string, any> = {}

  return (data: any) => {
    const hash: string = data.hash

    if (cache[hash]) {
      return cache[hash]
    }

    const res = f(data)
    cache[hash] = res
    return res
  }
}

const extractTransfer = memo((data: any) => {
  const { relatedAddress } = data
  const transferLogs = data.logs ? data.logs
    .filter((d: any) => d.topics.includes(erc20TransferTopic)) : []

  for (let i = 0; i < transferLogs.length; i++) {
    const transferLog = transferLogs[i]
    const event = transferLog
      ? parseSuggestedEvent('Transfer(address,address,uint256)', transferLog.data, transferLog.topics)
      : null

    if (!event) {
      continue
    }

    event.parsed['$0'] = event.parsed['$0'].toLowerCase()
    event.parsed['$1'] = event.parsed['$1'].toLowerCase()

    if (relatedAddress === event.parsed['$0'] || relatedAddress === event.parsed['$1']) {
      return {
        transferLog: transferLog || {},
        parsed: event.parsed || {}
      }
    }
  }

  return {
    transferLog: {},
    parsed: {}
  }
})

const Marker = styled.div<{ out: boolean }>`
  border-radius: 2px;
  padding: 5px;

  text-align: center;
  font-weight: bold;

  ${(props) =>
  props.out
    ? css`
          background: rgb(239 145 62);
          color: #fff;
        `
    : css`
          background: rgba(105, 250, 189, 0.8);
          color: #1b295e;
        `};
`;

export function getERC20Columns(id: string): ColumnConfig<any>[] {
  return [
    {
      property: 'hash',
      header: (
        <Text
          color="minorText"
          size="small"
          style={{ fontWeight: 300, width: '95px' }}
        >
          Hash
        </Text>
      ),
      render: (data: any) => (
        <Address address={data.transactionHash || data.hash} type="tx" isShort />
      )
    },
    {
      property: 'from',
      header: (
        <Text
          color="minorText"
          size="small"
          style={{ fontWeight: 300, width: '120px' }}
        >
          From
        </Text>
      ),
      render: (data: RelatedTransaction) => {
        const { parsed } = extractTransfer(data)
        const address = (parsed['$0'] || '') || '?'

        return (
          <Text size="12px">
            <Address isShort address={address} />
          </Text>)
      }
    },
    {
      property: "marker",
      header: <></>,
      render: (data: RelatedTransaction) => {
        const { parsed } = extractTransfer(data)
        const address = (parsed['$0'] || '') || '?'

        return (
        <Text size="12px">
          <Marker out={address === id}>
            {address === id? "OUT" : "IN"}
          </Marker>
        </Text>
      )
      },
    },
    {
      property: 'to',
      header: (
        <Text
          color="minorText"
          size="small"
          style={{ fontWeight: 300, width: '120px' }}
        >
          To
        </Text>
      ),
      render: (data: RelatedTransaction) => {
        const { parsed } = extractTransfer(data)
        const address = (parsed['$1'] || '') || '?'

        return (
          <Text size="12px">
            <Address isShort address={address} />
          </Text>)
      }
    },
    {
      property: 'value',
      header: (
        <Text
          color="minorText"
          size="small"
          style={{ fontWeight: 300, width: '320px' }}
        >
          Value
        </Text>
      ),
      render: (data: RelatedTransaction) => {
        const { parsed, transferLog } = extractTransfer(data)
        const value = parsed['$2']

        if (!transferLog || !value) {
          return '?'
        }

        return (
          <Text size="12px">
            <TokenValue tokenAddress={transferLog.address} value={value} />
          </Text>)
      }
    },
    {
      property: 'token',
      header: (
        <Text
          color="minorText"
          size="small"
          style={{ fontWeight: 300, width: '120px' }}
        >
          Token
        </Text>
      ),
      render: (data: any) => {
        const { transferLog } = extractTransfer(data)
        const address = transferLog ? transferLog.address : '—'

        return (
          <Text size="12px">
            <Address address={address} />
          </Text>
        )
      }
    },
    {
      property: 'timestamp',
      header: (
        <Text
          color="minorText"
          size="small"
          style={{ fontWeight: 300, width: '140px' }}
        >
          Timestamp
        </Text>
      ),
      render: (data: RelatedTransaction) => (
        <Box direction="row" gap="xsmall" justify="end">
          <RelativeTimer
            date={data.timestamp}
            updateInterval={1000}
            style={{ minWidth: 'auto' }}
          />
        </Box>
      )
    }
  ]
}