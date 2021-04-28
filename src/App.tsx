import React from 'react'
import './index.css'
import { Box, Grommet } from 'grommet'
import { BrowserRouter as Router } from 'react-router-dom'

import { Routes } from 'src/Routes'
import { AppHeader } from 'src/components/appHeader'
import { AppFooter } from 'src/components/appFooter'

import { SearchInput, BaseContainer } from 'src/components/ui'
import { theme } from './theme';

function App() {
  return (
    <Router>
      <Grommet theme={theme} full>
        <Box fill background="#f3f3f3" style={{ margin: 'auto' }}>
          <AppHeader />
          <Box fill align="center">
            <BaseContainer>
              <SearchInput />
              <Routes />
            </BaseContainer>
          </Box>
          <AppFooter />
        </Box>
      </Grommet>
    </Router>
  )
}

export default App
