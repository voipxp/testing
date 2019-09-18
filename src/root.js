import { hot } from 'react-hot-loader/root'
import React from 'react'
import { HashRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { App } from '@/components/app'
import { client } from './apollo'

export const Root = hot(() => {
  return (
    <ApolloProvider client={client}>
      <HashRouter hashType="hashbang">
        <App />
      </HashRouter>
    </ApolloProvider>
  )
})
