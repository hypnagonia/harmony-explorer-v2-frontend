import React from 'react'

import { Search } from 'grommet-icons';
import { Box, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

export const SearchInput = () => {

  return (
      <Box width="100%"  pad={{left: 'medium', right: 'medium', top:'medium'}}>
        <TextInput icon={<Search color="brand"/>} placeholder="Search by Address / Transaction Hash / Block / Token" />
      </Box>
  )
}