import { TransactionDetails } from 'src/components/transaction/TransactionDetails'
import { Block, RPCStakingTransactionHarmony } from '../types'
import {
  RouteComponentProps,
  useParams
} from 'react-router-dom'
import { transport } from 'src/api/explorer'
import { useEffect, useState } from 'react'


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

  return <TransactionDetails transaction={tx} />
}