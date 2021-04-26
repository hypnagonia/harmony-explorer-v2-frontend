import { useONEExchangeRate } from '../../hooks/useONEExchangeRate'

// @ts-ignore
export const ONEValue = ({value}) => {
  const { lastPrice } = useONEExchangeRate()

  const bi = BigInt(value) / BigInt(10 ** 14)
  const v = parseInt(bi.toString()) / 10000
  let USDValue
  if (lastPrice) {
    USDValue = (v * +lastPrice).toLocaleString('en-US',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        currency: 'USD' }
    )
  }

  return <>{v.toString()}&nbsp;{USDValue ? <>(${USDValue})</> : null}</>
}