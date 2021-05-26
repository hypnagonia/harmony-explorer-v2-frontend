import Web3 from 'web3'
import { Text } from 'grommet'
import React from 'react'
import { Address } from '../components/ui'

const web3 = new Web3()

export const parseSuggestedMethod = () => {

}


export const parseSuggestedEvent = (textSignature: string, data: string, topics: string[]): any => {
  if (!textSignature) {
    return
  }

  const event = parseTextSignature(textSignature)
  if (!event) {
    return
  }

  const abi = createABI(event.name, event.params, 'event')
  if (abi.inputs.length) {
    try {
      const [topic0, ...restTopics] = topics
      const parsed = web3.eth.abi.decodeLog(abi.inputs, data,  restTopics)
      return {
        event,
        abi,
        parsed
      }

    } catch (err) {
      console.error(err)
      return null
    }
  }
}


const createABI = (name: string, params: string[], type: 'event' | 'function') => {
  const inputs = params.map((type, i) => ({
    name: `$${i}`, type,
    indexed: type === 'address'
  }))
  return {
    inputs,
    type,
    name
  }
}

const parseTextSignature = (sig: string) => {
  try {
    const [name, ...rest] = sig.split('(')
    const params = rest.join('').split(')')[0].split(',')

    return {
      name,
      params
    }
  } catch (err) {
    console.error(err)
    return null
  }
}

export const DisplaySignature = (props: any = {}) => {
  const { parsed, event, abi } = props

  if (!parsed || !event || !abi) {
    return <></>
  }

  return (
    <>
      <b>{event.name}</b>
      (
      <>
        {abi.inputs.map((input: any, i: number) => {
          return <>
            <Text size="small" color="minorText">{input.type}</Text>:&nbsp;
            {input.type === 'address' ?
              <Address address={parsed[input.name].toLowerCase()} />
              : parsed[input.name]
            }

            {i < abi.inputs.length - 1 ? ', ' : null}
          </>
        })}
      </>
      )
    </>
  )
}