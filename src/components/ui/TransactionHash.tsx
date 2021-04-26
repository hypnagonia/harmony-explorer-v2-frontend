import React from 'react'

import {AnchorLink} from './AnchorLink'

// @ts-ignore
export const TransactionHash = ({ hash }) => {
  const link = `/tx/${hash}`
  return <AnchorLink to={link} label={hash} />
}