import React from 'react'

import { Box, Button, Heading, Grommet } from 'grommet'
import { Notification, Configure } from 'grommet-icons'
import { BlockDetails } from './components/block/BlockDetails'
import { Block } from './types'
import {SearchInput} from './components/ui/Search'

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

const theme = {
  global: {
    colors: {
      // brand: '#00aee9',
      border: '#e7ecf7'
    },
    font: {
      family: 'Nunito',
      size: '14px',
      height: '20px'
    }
  }
}

const block: Block = {
  'number': '1100000',
  'hash': '0x0c2bd0e20beaf8fc5159260f13f3a5a813d4e1bb5468d707203d06b9c4220481',
  'miner': '0x91198072b678e0242623575ea5ece5689ba3f46e',
  'extraData': '0x',
  'gasLimit': '500000000000000000',
  'gasUsed': '0',
  'timestamp': '1970-01-19T04:22:11.574Z',
  'difficulty': '0',
  'logsBloom': '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  'mixHash': '0x0000000000000000000000000000000000000000000000000000000000000000',
  'nonce': '0',
  'parentHash': '0x4771e178866b0b4c6e3b6bcf48d8f55fa62dfaffd0a83809ea2ae552d326dde4',
  'receiptsRoot': '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
  'sha3Uncles': null,
  'size': '741',
  'stateRoot': '0x0d32337041359a5fa524a952b13485f7b607c40936147b51370aab77ac389d78',
  'transactions': [],
  'stakingTransactions': [],
  'transactionsRoot': '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
  'uncles': [],
  'epoch': '47',
  'viewID': '0x10c8fa'
}

function App() {
  return (
    <Grommet theme={theme} full>
      <Box fill>
        <AppBar>
          <Heading level="5" margin="none">Harmony Block Explorer</Heading>
          <Button icon={<Configure size="medium"/>} onClick={() => {
          }} />
        </AppBar>
        <SearchInput/>
        <Box direction="column" flex overflow={{ horizontal: 'scroll' }} pad="medium">
          <BlockDetails block={block}/>
        </Box>
      </Box>
    </Grommet>
  )
}

export default App
