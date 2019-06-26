import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

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

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
})
