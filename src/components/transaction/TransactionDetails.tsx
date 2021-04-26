import React, { FunctionComponent } from 'react'
import { Block, RPCStakingTransactionHarmony } from '../../types'
import { blockPropertyDisplayNames, blockPropertySort,
  blockPropertyDescriptions, blockDisplayValues } from '../block/helpers'
import {
  transactionPropertyDisplayNames,
  transactionDisplayValues,
  transactionPropertySort,
  transactionPropertyDescriptions
}  from './helpers'
import { Address, BlockHash, BlockNumber, Timestamp, TipContent, TransactionHash } from 'src/components/ui'
import {
  Box,
  DataTable,
  Tip,
} from 'grommet'

import { Blank, CircleQuestion, FormNextLink, FormPreviousLink } from 'grommet-icons'
import { Link } from 'react-router-dom'

const columns = [
  {
    property: 'key',
    // header: (e:any) <Text>Block</Text>,
    render: (e: any) => <div>
      <Tip
        dropProps={{ align: { left: 'right' } }}
        content={<TipContent message={transactionPropertyDescriptions[e.key]} />}
        plain
      >
        <span><CircleQuestion size="small"/></span>
      </Tip>
      &nbsp;{transactionPropertyDisplayNames[e.key] || e.key}
    </div>,
    size: '1/3'
  },
  {
    property: 'value',
    size: '2/3',
    render: (e: any) => e.value
  }
]

type TransactionDetailsProps = {
  transaction: RPCStakingTransactionHarmony
}
type tableEntry = {
  key: string,
  value: any
}

export const TransactionDetails: FunctionComponent<TransactionDetailsProps> = ({ transaction }) => {
  const keys = Object.keys(transaction)
  const sortedKeys = keys
    .sort((a, b) => transactionPropertySort[b] - transactionPropertySort[a])

  const txData = sortedKeys.reduce((arr, key) => {
    // @ts-ignore
    const value = transactionDisplayValues(transaction, key, transaction[key])
    if (value === undefined) {
      return arr
    }

    arr.push({ key, value } as tableEntry)
    return arr
  }, [] as tableEntry[])

  return <>
    <Box flex align="start" justify="start">
      <div>
        <b>Transaction Details</b>
      </div>
      <DataTable
        style={{ width: '100%' }}
        columns={columns}
        data={txData}
        step={10}
        border={{
          header: {
            color: 'none'
          },
          body: {
            color: 'border',
            side: 'top',
            size: '1px'
          }
        }}
      />
    </Box>
  </>
}