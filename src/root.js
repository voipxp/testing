import { hot } from 'react-hot-loader/root'
import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { App } from '@/components/app'
import { store, loadInitialState } from '@/store'
import api from '@/api'
import { clearSession } from '@/store/session'

const STORAGE_KEY = 'odin:token'

const httpLink = createHttpLink({
  uri: 'http://localhost:10000/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(STORAGE_KEY)
  return {
    headers: { ...headers, authorization: token ? `Bearer ${token}` : '' }
  }
})

const cache = new InMemoryCache()

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.status === 401 || error.status === 403) {
      store.dispatch(clearSession())
    }
    return Promise.reject(error)
  }
)

loadInitialState()

export const Root = hot(() => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <HashRouter hashType="hashbang">
        <App />
      </HashRouter>
    </Provider>
  </ApolloProvider>
))
