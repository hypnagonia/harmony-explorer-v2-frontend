import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { BasePage } from 'src/components/ui';
import { BlockPage } from 'src/pages/BlockPage'
import { TransactionPage } from 'src/pages/TransactionPage'


export function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <BasePage>Main Page</BasePage>
        </Route>

        <Route path="/block/:id">
          <BlockPage />
        </Route>

        <Route path="/tx/:id">
          <TransactionPage />
        </Route>
      </Switch>
      </>
  )
}