import { BlockDetails } from 'src/components/block/BlockDetails'
import { Block } from '../types'
import {
  useParams
} from 'react-router-dom'
import { transport } from 'src/api/explorer'
import { useEffect, useState } from 'react'


export const BlockPage = () => {
  // hash or number
  // @ts-ignore
  const { id } = useParams()
  const [block, setBlock] = useState<Block | null>(null)

  useEffect(() => {
    let cleanupFunction = false

    const exec = async () => {
      let block
      if ('' + +id === id) {
        block = await transport('getBlockByNumber', [0, +id])
      } else {
        block = await transport('getBlockByHash', [0, id])
      }
      if (!cleanupFunction) {
        setBlock(block as Block)
      }
    }
    exec()

    return () => {
      cleanupFunction = true
    }
  }, [id])

  if (!block) {
    return null
  }

  return <BlockDetails block={block} />
}