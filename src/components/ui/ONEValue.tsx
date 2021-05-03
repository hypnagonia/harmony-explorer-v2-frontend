import { useONEExchangeRate } from '../../hooks/useONEExchangeRate'
import { Text, Box } from 'grommet'

// @ts-ignore
export const ONEValue = ({ value }) => {
  const { lastPrice } = useONEExchangeRate()

  const bi = BigInt(value) / BigInt(10 ** 14)
  const v = parseInt(bi.toString()) / 10000
  let USDValue
  if (lastPrice && v > 0) {
    USDValue = (v * +lastPrice).toLocaleString('en-US',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        currency: 'USD'
      }
    )
  }

  return (
    <>
      <Text weight={v > 0 ? 'bold' : 'normal'} size="small" margin={{ right: 'xxmall' }}>{v.toString()} ONE</Text>
      {
        USDValue ? <>(${USDValue})</> : null
      }
    </>
  )
}