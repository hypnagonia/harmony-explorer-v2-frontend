import React from 'react'
import {
  Link
} from 'react-router-dom'
import { Anchor } from 'grommet'
// @ts-ignore
export const BlockHash = ({ hash }) => {
  const link = `/block/${hash}`
  return <Link to={link}>
    <Anchor>{hash}</Anchor>
  </Link>
}