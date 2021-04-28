import React, { useCallback, useState, useEffect } from 'react'
import { transport } from 'src/api/explorer'
import { Search } from 'grommet-icons'
import { Box, TextInput } from 'grommet'
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
        // is block hash or tx hash
        try {
          await Promise.all([
            transport('getBlockByHash', [0, v])
              .then((res) => {
                if (!res) {
                  return
                }
                history.push(`/block/${v}`)
              }).catch(),
            transport('getTransactionByField', [0, 'hash', v])
              .then((res) => {
                if (!res) {
                  return
                }
                history.push(`/tx/${v}`)
              }).catch()
          ])
          return
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
    timeoutID = setTimeout(() => setReadySubmit(true), 200)
  }, [])

  return (
    <Box width="100%" pad={{ vertical: 'medium' }}>
      <TextInput
        value={value}
        onChange={onChange}
        icon={<Search color="brand" />}
        style={{ backgroundColor: 'white' }}
        placeholder="Search by Address / Transaction Hash / Block / Token" />
    </Box>
  )
}