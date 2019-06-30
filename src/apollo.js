import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'

const STORAGE_KEY = 'odin:token'

const httpLink = new HttpLink({ uri: 'http://localhost:10000/graphql' })

const cache = new InMemoryCache()

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(STORAGE_KEY)
  operation.setContext({
    headers: { authorization: token ? `Bearer ${token}` : null }
  })
  return forward(operation)
})

export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache
})
