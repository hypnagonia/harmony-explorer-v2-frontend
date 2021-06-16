import React from 'react'
import {
  Link
} from 'react-router-dom'
import { Anchor } from 'grommet'
import {AnchorLink} from './AnchorLink'
import { formatNumber } from '.'

// @ts-ignore

export const BlockNumber = ({ number }) => {
  const link = `/block/${number}`
  return <AnchorLink to={link} label={formatNumber(+number, {})} style={{fontWeight: 400}} />
}