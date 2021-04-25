import { Address, Timestamp } from '../components/ui'
import { Clone } from 'grommet-icons'
import React from 'react'
import {Block} from '../types'

export const blockPropertyDisplayNames: Record<string, string> = {
  'number': 'Height',
  'hash': 'Hash',
  'miner': 'Mined by',
  'extraData': 'Extra Data',
  'gasLimit': 'Gas Limit',
  'gasUsed': 'Gas Used',
  'timestamp': 'Timestamp',
  'difficulty': 'Difficulty',
  'logsBloom': 'Logs Bloom',
  'mixHash': 'Mix Hash',
  'nonce': 'Nonce',
  'parentHash': 'Parent Hash',
  'receiptsRoot': 'Receipts Root',
  'sha3Uncles': 'SHA3 Uncles',
  'size': 'Size',
  'stateRoot': 'State Root',
  'transactions': 'Transactions',
  'stakingTransactions': 'Staking Transactions',
  'transactionsRoot': 'Transactions Root',
  'uncles': 'Uncles',
  'epoch': 'Epoch',
  'viewID': 'View ID'
}

export const blockPropertySort: Record<string, number> = {
  'number': 1000,
  'hash': 995,
  'miner': 960,
  'extraData': 500,
  'gasLimit': 900,
  'gasUsed': 890,
  'timestamp': 990,
  'difficulty': 500,
  'logsBloom': 500,
  'mixHash': 500,
  'nonce': 500,
  'parentHash': 500,
  'receiptsRoot': 500,
  'sha3Uncles': 500,
  'size': 500,
  'stateRoot': 500,
  'transactions': 980,
  'stakingTransactions': 970,
  'transactionsRoot': 500,
  'uncles': 500,
  'epoch': 500,
  'viewID': 500
}

export const blockPropertyDisplayValues: any = {
  // @ts-ignore
  'number': (value: any) => <Address address={value} />,
  'timestamp': (value: any) => <Timestamp timestamp={value} />,
  'gasUsed': (value: any, block: Block) => <span>{value} ({+value / +block.gasLimit}%) </span>
}

export const blockDisplayValues = (block: Block, key: string, value: any) => {
  const f = blockPropertyDisplayValues[key]

  let displayValue = value

  if (f) {
    displayValue = f(value, block)
  } else {

    if (Array.isArray(value)) {
      displayValue = value.join(', ')
    }

    if (value && value.length && value.length > 66) {
      displayValue = value.slice(0, 63) + '...'
    }

    if (displayValue === '0x') {
      displayValue = null
    }
  }

  return <div>
    {displayValue !=='0' && displayValue && <><Clone size="small" color="brand" />&nbsp;</>}
    {displayValue || '—'}
  </div>
}