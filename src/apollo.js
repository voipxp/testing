import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { AUTH_WHITELIST, TOKEN_KEY } from '@/graphql'
import gql from 'graphql-tag'

const httpLink = new HttpLink({ uri: '/graphql' })

const cache = new InMemoryCache({ freezeResults: true })

/*
  Set the auth token unless its in a whitelist.  This is to
  prevent sending an old auth token along with a login request
*/
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

const logger = (type, err) => console.log(type, JSON.stringify(err, null, 2))

/*
  Error interceptor.

  TODO: catch unauthorized, password expired errors and show login page
*/
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(err => logger('[GraphQL error]:', err))
  }
  if (networkError) logger(['[Network error]:', networkError])
})

const omitTypename = (key, value) => {
  return key === '__typename' || key === '_id' ? undefined : value
}

/*
  Apollo automatically sends _typename in the query.  This causes
  a failure on the server-side because _typename is not specified
  in the schema.  WTF?

  This middleware removes it.
*/
const omitTypenameLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    )
  }
  return forward ? forward(operation) : null
})

const link = ApolloLink.from([
  authMiddleware,
  errorLink,
  omitTypenameLink,
  httpLink
])

export const client = new ApolloClient({
  link,
  cache,
  assumeImmutableResults: true
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
