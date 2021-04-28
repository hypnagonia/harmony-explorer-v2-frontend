import React from 'react'
import { Box, Text } from "grommet"
import { Group, Medium, Twitter } from 'grommet-icons'

import { theme } from 'src/theme'
import { TelegramIcon } from 'src/components/ui/icons'

export function AppFooter() {
  const { CoolGray } = theme?.global?.palette;

  return (
    <Box background="white" justify="center" align="center" pad="medium">
      <Box gap="xsmall">
        <Box direction="row" width="320px" justify="center" gap="medium">
          <a href="https://harmony.one/team" target="_blank" rel="noreferrer">
            <Group size="24px" color={CoolGray} style={{ cursor: 'pointer'}} />
          </a>
          <a href="https://medium.com/harmony-one" target="_blank" rel="noreferrer">
            <Medium size="24px" color={CoolGray} style={{ cursor: 'pointer'}} />
          </a>
          <a href="https://twitter.com/harmonyprotocol" target="_blank" rel="noreferrer">
            <Twitter size="24px" color={CoolGray} style={{ cursor: 'pointer'}} />
          </a>
          <a href="https://t.me/harmony_one" target="_blank" rel="noreferrer">
            <TelegramIcon size="24px" color={CoolGray} />
          </a>
        </Box>
        {/*<Box direction="row" justify="center" align="center" gap="xsmall">*/}
        {/*  <Anchor color="minorText" size="small" weight="normal" href="/">Terms of Use</Anchor>*/}
        {/*  <Text color="minorText" size="medium">|</Text>*/}
        {/*  <Anchor color="minorText" size="small" weight="normal" href="/">Privacy Policy</Anchor>*/}
        {/*</Box>*/}
        <Box direction="row" justify="center" align="center" gap="xsmall">
          <Text color="minorText" size="xsmall">Copyright © {new Date().getFullYear()} Harmony</Text>
          <Text color="minorText" size="small">|</Text>
          <Text color="minorText" size="xsmall">All Rights Reserved</Text>
        </Box>
      </Box>
    </Box>
  )
}