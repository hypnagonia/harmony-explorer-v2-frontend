import React from 'react'
import {Clock} from 'grommet-icons'

// @ts-ignore
export const Timestamp = ({timestamp}) => {
  return <span><Clock size="small"/>&nbsp;{new Date(timestamp).toLocaleDateString('en-US')}</span>
}