import React from 'react'
import useAPIPolling, { APIPollingOptions } from './polling'

const url = 'https://api.binance.com/api/v1/ticker/24hr?symbol=ONEUSDT'
const fetchFunc = () => fetch(url).then(r => r.json())

export const useONEExchangeRate = () => {
  const options: APIPollingOptions<any> = {
    fetchFunc,
    initialState: {},
    delay: 30000
  }
  return useAPIPolling(options)
}