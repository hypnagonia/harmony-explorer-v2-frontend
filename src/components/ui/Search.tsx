import React, { useCallback, useState, useEffect } from 'react'
import { transport } from 'src/api/explorer'
import { Search } from 'grommet-icons'
import { Box, Grommet, TextInput } from 'grommet'
import { grommet } from 'grommet/themes'
import { useHistory } from 'react-router-dom'

let timeoutID: any | null = null

export const SearchInput = () => {
  const [value, setValue] = useState('')
  const [readySubmit, setReadySubmit] = useState(false)

  const history = useHistory()

  useEffect(() => {
    const exec = async () => {
      // todo separate validation
      const v = value.split(' ').join('')

      setReadySubmit(false)
      if ('' + +v === v && +v > 0) {
        // is block number
        history.push(`/block/${v}`)
        return
      }

      if (v.length !== 66 && v.length !== 42) {
        return
      }
      if (v.length === 66 && v[0] === '0' && v[1] === 'x') {
        // is block hash
        try {
          await transport('getBlockByHash', [0, v])
          history.push(`/block/${v}`)
        } catch (e) {
        }
        // eth or harmony hash
        try {
          await transport('getTransactionByField', [0, 'hash', v])
          history.push(`/tx/${v}`)
        } catch (e) {
        }
      }
    }

    exec()
  }, [readySubmit])

  const onChange = useCallback(event => {
    const { value: newValue } = event.target
    setValue(newValue)
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => setReadySubmit(true), 500)
  }, [])

  return (
    <Box width="100%" pad={{ left: 'medium', right: 'medium', top: 'medium' }}>
      <TextInput
        value={value}
        onChange={onChange}
        icon={<Search color="brand" />}
        placeholder="Search by Address / Transaction Hash / Block / Token" />
    </Box>
  )
}