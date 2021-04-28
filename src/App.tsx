import React from 'react'
import './index.css'
import { Box, Button, Heading, Grommet } from 'grommet'
import { Configure } from 'grommet-icons'
import { BrowserRouter as Router } from 'react-router-dom'

import { Routes } from 'src/Routes'
import { FiatPrice } from 'src/components/ui'
import { AppFooter } from 'src/components/appFooter'

import { SearchInput } from './components/ui/Search'
import { theme } from './theme';

const AppBar = (props: any) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation="medium"
    style={{ zIndex: '1' }}
    {...props}

  />
)

function App() {
  return (
    <Router>
      <Grommet theme={theme} full>
        <Box fill background="#dedede">
          <AppBar>
            <Heading level="5" margin="none">
              Harmony Block Explorer<br />
              <FiatPrice />
            </Heading>
            <Button icon={<Configure size="medium" />} onClick={() => {}} />
          </AppBar>
          <SearchInput />
          <Box direction="column" flex overflow={{ horizontal: 'scroll' }} pad="medium">
            <Routes />
          </Box>
          <AppFooter />
        </Box>
      </Grommet>
    </Router>
  )
}

export default App
