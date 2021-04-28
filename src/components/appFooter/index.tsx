import React from 'react'
import { Box, Anchor, Text } from "grommet"
import { Group, Medium, Twitter } from 'grommet-icons'
import { theme } from 'src/theme'
import { TelegramIcon } from 'src/components/ui/icons'

export function AppFooter() {
  const { CoolGray } = theme?.global?.palette;

  return (
    <Box background="white" justify="center" align="center" pad="medium">
      <Box gap="xsmall">
        <Box direction="row" width="320px" justify="center" gap="medium" margin={{ bottom: 'small' }}>
          <Group size="24px" color={CoolGray} style={{ cursor: 'pointer'}} onClick={() => window.location.href = '/'} />
          <Medium size="24px" color={CoolGray} style={{ cursor: 'pointer'}} />
          <Twitter size="24px" color={CoolGray} style={{ cursor: 'pointer'}} />
          <TelegramIcon size="24px" color={CoolGray} />
        </Box>
        <Box direction="row" justify="center" align="center" gap="xsmall">
          <Anchor color="minorText" size="small" weight="normal" href="/">Terms of Use</Anchor>
          <Text color="minorText" size="medium">|</Text>
          <Anchor color="minorText" size="small" weight="normal" href="/">Privacy Policy</Anchor>
        </Box>
        <Box direction="row" justify="center" align="center" gap="xsmall">
          <Text color="minorText" size="xsmall">Copyright © {new Date().getFullYear()} Harmony</Text>
          <Text color="minorText" size="small">|</Text>
          <Text color="minorText" size="xsmall">All Rights Reserved</Text>
        </Box>
      </Box>
    </Box>
  )
}