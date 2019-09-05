import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { AUTH_WHITELIST, TOKEN_KEY } from '@/graphql'
import gql from 'graphql-tag'

const httpLink = new HttpLink({ uri: '/graphql' })

// Angular doesn't like this OR we have to fix selects
// without track by to properly use track by
// const cache = new InMemoryCache({ freezeResults: true })
const cache = new InMemoryCache()

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
  All known error extensions listed below.

  TODO: catch unathenticated, forbidden, password expired errors and show login page
*/
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(err => {
      switch (err.extensions.code) {
        case 'FORBIDDEN':
          return logger(`[${err.extensions.code}]`, err)
        case 'UNAUTHENTICATED':
          return logger(`[${err.extensions.code}]`, err)
        case 'PASSWORD_EXPIRED':
          return logger(`[${err.extensions.code}]`, err)
        case 'NOT_FOUND':
        case 'BAD_USER_INPUT':
        case 'INTERNAL_SERVER_ERROR':
        case 'GRAPHQL_PARSE_FAILED':
        case 'GRAPHQL_VALIDATION_FAILED':
        case 'PERSISTED_QUERY_NOT_FOUND':
        case 'PERSISTED_QUERY_NOT_SUPPORTED':
          return logger(`[${err.extensions.code}]`, err)
        default:
          logger('[GraphQL error]:', err)
      }
    })
  }
  if (networkError) logger(['[Network error]:', networkError])
})

const omitTypename = (key, value) => {
  return key === '__typename' || key === '_id' || /^\$/.test(key) ? undefined : value
}

/*
  Apollo automatically sends _typename in the query.  This causes
  a failure on the server-side because _typename is not specified
  in the schema. This middleware removes it.
*/
const omitTypenameLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename)
  }
  return forward ? forward(operation) : null
})

const link = ApolloLink.from([authMiddleware, errorLink, omitTypenameLink, httpLink])

export const client = new ApolloClient({
  link,
  cache,
  assumeImmutableResults: true
})

/*
  We need to set initial state here on the global session
  object because the rest of the app is querying it using
  cache-only, using it as local state.
  https://www.apollographql.com/docs/react/essentials/local-state/#initializing-the-cache
*/
export const setInitialState = () => {
  cache.writeQuery({
    query: gql`
      query initialSession {
        session {
          _id
        }
      }
    `,
    data: { session: { __typename: 'Session', _id: '_session' } }
  })
}

// if we reset the store, also reset initialState
client.onResetStore(setInitialState)

// now run it on app load
setInitialState()