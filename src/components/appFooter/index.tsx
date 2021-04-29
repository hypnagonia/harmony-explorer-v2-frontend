import React from 'react'
import { Box, Text } from "grommet"
import { Group, Medium, Twitter } from 'grommet-icons'
import styled, {CSSProperties} from 'styled-components';

import { theme } from 'src/theme'
import { TelegramIcon, DiscordIcon } from 'src/components/ui/icons'

const IconAhchor = styled.a`
  opacity: 0.9;
  transition: 0.17s ease all;
  
  &:hover {
    opacity: 1;
  }
`;

export function AppFooter(props: { style: CSSProperties }) {
  const { CoolGray } = theme?.global?.palette;

  return (
    <Box background="white" justify="center" align="center" pad="medium" margin={{ top: 'medium' }} {...props}>
      <Box gap="xsmall">
        <Box direction="row" width="320px" justify="center" align="center" gap="medium">
          <IconAhchor href="https://harmony.one/team" target="_blank" rel="noreferrer">
            <Group size="24px" color={CoolGray} style={{ cursor: 'pointer'}} />
          </IconAhchor>
          <IconAhchor href="https://harmony.one/discord" target="_blank" rel="noreferrer">
            <DiscordIcon size="23px" color={CoolGray} />
          </IconAhchor>
          <IconAhchor href="https://medium.com/harmony-one" target="_blank" rel="noreferrer">
            <Medium size="23px" color={CoolGray} style={{ cursor: 'pointer'}} />
          </IconAhchor>
          <IconAhchor href="https://t.me/harmony_one" target="_blank" rel="noreferrer">
            <TelegramIcon size="22px" color={CoolGray} />
          </IconAhchor>
          <IconAhchor href="https://twitter.com/harmonyprotocol" target="_blank" rel="noreferrer">
            <Twitter size="24px" color={CoolGray} style={{ cursor: 'pointer'}} />
          </IconAhchor>
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