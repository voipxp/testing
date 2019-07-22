import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

const STORAGE_KEY = 'odin:token'

const httpLink = new HttpLink({ uri: 'http://localhost:10000/graphql' })

const cache = new InMemoryCache()

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(STORAGE_KEY)
  const headers = token ? { authorization: `Bearer ${token}` } : {}
  operation.setContext({ headers })
  return forward(operation)
})

export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache
})

// init cache
cache.writeQuery({
  query: gql`
    query session @client {
      session {
        _id
      }
    }
  `,
  data: { session: { __typename: 'Session', _id: '_session' } }
})
