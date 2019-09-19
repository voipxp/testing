import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { TOKEN_KEY } from '@/utils'
import {
  AUTH_WHITELIST,
  ALERTS_QUERY,
  ALERTS_DEFAULT,
  APP_QUERY,
  APP_DEFAULT,
  SESSION_QUERY,
  SESSION_DEFAULT,
  typeDefs,
  resolvers
} from '@/graphql'

const httpLink = new HttpLink({ uri: '/graphql' })
const cache = new InMemoryCache({ freezeResults: true })
const logger = (type, err) => console.log(type, JSON.stringify(err, null, 2))

/*
  Set the auth token unless its in a whitelist.  This is to
  prevent sending an old auth token along with a login request
*/
const authMiddleware = new ApolloLink((operation, forward) => {
  const { operationName } = operation
  if (AUTH_WHITELIST.includes(operationName)) return forward(operation)

  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    operation.setContext({ headers: { authorization: `Bearer ${token}` } })
    return forward(operation)
  }

  logger(`[skipOperation]`, { operationName })
})

/*
  Error interceptor.
  All known error extensions listed below.

  TODO [2019-10-01]: catch unathenticated, forbidden, password expired errors and show login page
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
  typeDefs,
  resolvers,
  assumeImmutableResults: true
})

export const setInitialState = () => {
  cache.writeQuery({ query: SESSION_QUERY, data: SESSION_DEFAULT })
  cache.writeQuery({ query: ALERTS_QUERY, data: ALERTS_DEFAULT })
  cache.writeQuery({ query: APP_QUERY, data: APP_DEFAULT })
}

// if we reset the store, also reset initialState
client.onResetStore(setInitialState)

// now run it on app load
setInitialState()
