import React from 'react'

import { grommet, Box, Button, Grommet, Heading, Text, Tip } from 'grommet'
import { Trash } from 'grommet-icons'

// @ts-ignore
export const TipContent = ({ message }) => (
  <Box direction="row" align="center">
    <Box background="white" direction="row" pad="small" round="xsmall" border={{color: 'brand'}}>
      <div>{message}</div>
    </Box>
  </Box>
)