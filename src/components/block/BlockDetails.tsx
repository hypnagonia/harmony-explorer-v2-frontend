import React, { FunctionComponent } from 'react'
import { Block } from '../../types'
import {blockPropertyDisplayNames, blockPropertySort, blockDisplayValues} from '../../utils/mapPropertyNames'

import {
  Box,
  Grommet,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
  Text,
  Meter,
  DataTable
} from 'grommet'
import { grommet } from 'grommet/themes'

import { Blank, CircleQuestion } from 'grommet-icons'

const columns = [
  {
    property: 'key',
    // header: (e:any) <Text>Block</Text>,
    render: (e: any) => <div>
      <CircleQuestion size="small" />
      &nbsp;{blockPropertyDisplayNames[e.key] || e.key}
    </div>,
    size: '1/3'
  },
  {
    property: 'value',
    size: '2/3',
    render: (e: any) => e.value
  }
]

type BlockDetailsProps = {
  block: Block
}
type tableEntry = {
  key: string,
  value: any
}

export const BlockDetails: FunctionComponent<BlockDetailsProps> = ({ block }) => {
  const keys = Object.keys(block)
  const sortedKeys = keys.sort((a,b) => blockPropertySort[b] - blockPropertySort[a])

  const blockData = sortedKeys.reduce((arr, key) => {
    // @ts-ignore
    const value = blockDisplayValues( block, key, block[key])
    arr.push({ key, value} as tableEntry)
    return arr
  }, [] as tableEntry[])

  return <>
    <Box flex align="start" justify="start">
      <div>
      <b>Block</b> #{block.number}
      </div>
      <DataTable
        style={{ width: '100%' }}
        columns={columns}
        data={blockData}
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