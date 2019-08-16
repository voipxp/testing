import { hot } from 'react-hot-loader/root'
import React from 'react'
import { HashRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { App } from '@/components/app'
import api from '@/api'
import { client } from './apollo'
import { clearSession } from '@/graphql'

api.interceptors.response.use(
  response => response,
  error => {
    if (error.status === 401 || error.status === 403) clearSession()
    return Promise.reject(error)
  }
)

export const Root = hot(() => {
  return (
    <ApolloProvider client={client}>
      <HashRouter hashType="hashbang">
        <App />
      </HashRouter>
    </ApolloProvider>
  )
})
