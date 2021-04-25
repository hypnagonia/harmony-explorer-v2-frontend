import React from 'react'

// @ts-ignore
export const Timestamp = ({timestamp}) => {
  return <span>{new Date(timestamp).toLocaleDateString('en-US')}</span>
}