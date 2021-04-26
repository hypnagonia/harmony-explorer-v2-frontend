import { TransactionDetails } from 'src/components/transaction/TransactionDetails'
import { Block, RPCStakingTransactionHarmony } from '../types'
import {
  RouteComponentProps,
  useParams
} from 'react-router-dom'
import { transport } from 'src/api/explorer'
import React, { useEffect, useState } from 'react'
import { Box, Tabs, Tab, Text } from 'grommet'

export const TransactionPage = () => {
  // hash or number
  // @ts-ignore
  const { id } = useParams()
  const [tx, setTx] = useState<RPCStakingTransactionHarmony | null>(null)

  useEffect(() => {
    const exec = async () => {
      let tx
      if (id.length === 66) {
        tx = await transport('getTransactionByField', [0, 'hash', id])
      }
      setTx(tx as RPCStakingTransactionHarmony)
    }
    exec()

  }, [id])

  if (!tx) {
    return null
  }

  return (
    <>
      <Tabs alignControls="start">
        <Tab title={<Text size="small">Transaction Details</Text>}>
          <TransactionDetails transaction={tx} />
        </Tab>
        <Tab title={<Text size="small">Internal Transactions</Text>}>
          WIP
        </Tab>
        <Tab title={<Text size="small">Logs</Text>}>
          WIP
        </Tab>
      </Tabs>
    </>
  )
}