import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { BlockPage } from 'src/pages/BlockPage'
import { MainPage } from 'src/pages/MainPage'
import { TransactionPage } from 'src/pages/TransactionPage'
import { AllBlocksPage } from 'src/pages/AllBlocksPage'
import { AllTransactionsPage } from 'src/pages/AllTransactionsPage'

export function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>

        <Route exact path="/blocks">
          <AllBlocksPage />
        </Route>

        <Route path="/block/:id">
          <BlockPage />
        </Route>

        <Route path="/transactions">
          <AllTransactionsPage />
        </Route>

        <Route path="/tx/:id">
          <TransactionPage />
        </Route>
      </Switch>
      </>
  )
}