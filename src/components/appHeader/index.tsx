import React from 'react'
import { Box, Button, Heading } from "grommet"
import { FiatPrice, BaseContainer } from 'src/components/ui'
import { Configure } from "grommet-icons";

const HeaderLine = (props: any) => (
  <Box
    tag="header"
    direction="row"
    justify="center"
    background="brand"
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation="medium"
    style={{ zIndex: '1' }}
    {...props}
  />
)

export function AppHeader() {
  return (
    <HeaderLine>
      <BaseContainer
        direction="row"
        align="center"
        justify="between"
        flex
      >
        <Heading level="5" margin="none" >
          Harmony Block Explorer<br />
          <FiatPrice />
        </Heading>
        <Button icon={<Configure size="medium" />} onClick={() => {}} />
      </BaseContainer>
    </HeaderLine>
  )
}