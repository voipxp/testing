import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { AUTH_WHITELIST, TOKEN_KEY } from '@/graphql'
import gql from 'graphql-tag'

const httpLink = new HttpLink({ uri: '/graphql' })

const cache = new InMemoryCache()

const authMiddleware = new ApolloLink((operation, forward) => {
  if (AUTH_WHITELIST.includes(operation.operationName)) {
    return forward(operation)
  }
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    operation.setContext({ headers: { authorization: `Bearer ${token}` } })
  }
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
