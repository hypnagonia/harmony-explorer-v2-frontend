import { BlockDetails } from 'src/components/block/BlockDetails'
import { Block } from '../types'
import {
  RouteComponentProps,
  useParams
} from 'react-router-dom'
import { transport } from 'src/api/explorer'
import { useEffect, useState } from 'react'

const block: Block = {
  'number': '1100000',
  'hash': '0x0c2bd0e20beaf8fc5159260f13f3a5a813d4e1bb5468d707203d06b9c4220481',
  'miner': '0x91198072b678e0242623575ea5ece5689ba3f46e',
  'extraData': '0x',
  'gasLimit': '500000000000000000',
  'gasUsed': '0',
  'timestamp': '1970-01-19T04:22:11.574Z',
  'difficulty': '0',
  'logsBloom': '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  'mixHash': '0x0000000000000000000000000000000000000000000000000000000000000000',
  'nonce': '0',
  'parentHash': '0x4771e178866b0b4c6e3b6bcf48d8f55fa62dfaffd0a83809ea2ae552d326dde4',
  'receiptsRoot': '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
  'sha3Uncles': null,
  'size': '741',
  'stateRoot': '0x0d32337041359a5fa524a952b13485f7b607c40936147b51370aab77ac389d78',
  'transactions': [],
  'stakingTransactions': [],
  'transactionsRoot': '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
  'uncles': [],
  'epoch': '47',
  'viewID': '0x10c8fa'
}


export const BlockPage = () => {
  // hash or number
  // @ts-ignore
  const { id } = useParams()
  const [block, setBlock] = useState<Block | null>(null)

  useEffect(() => {
    const exec = async () => {
      let block
      if ('' + +id === id) {
        block = await transport('getBlockByNumber', [0, +id])
      } else {
        block = await transport('getBlockByHash', [0, id])
      }
      setBlock(block as Block)
    }
    exec()

  }, [id])

  if (!block) {
    return null
  }

  return <BlockDetails block={block} />
}