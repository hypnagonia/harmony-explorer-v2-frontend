import React from 'react'
import { Box } from 'grommet'

import { theme } from 'src/theme';

const sizes = {
  minWidth: '466px',
  maxWidth: '1368px',
};


export const BaseContainer = (props: any) => {
  const { style } = props;

  return (
    <Box {...props} style={{ ...sizes, width: '100%', flex: '1 1 auto', ...style }} />
  )
}

export const BasePage = (props: any) => {
  const { style } = props;

  return (
    <Box
      pad="medium"
      {...props}
      style={{ borderRadius: '8px', backgroundColor: 'white', border: `1px solid ${theme.global.colors.border}`, ...style }}
    />
  )
}