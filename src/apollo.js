import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Alerts } from './graphql'

const STORAGE_KEY = 'odin:token'

const httpLink = new HttpLink({ uri: 'http://localhost:10000/graphql' })

const cache = new InMemoryCache()

const initCache = () => cache.writeData({ data: { alerts: [] } })

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(STORAGE_KEY)
  operation.setContext({
    headers: { authorization: token ? `Bearer ${token}` : null }
  })
  return forward(operation)
})

export const client = new ApolloClient({
  cache,
  link: concat(authMiddleware, httpLink),
  typeDefs: { ...Alerts.typeDefs },
  resolvers: { Mutation: { ...Alerts.Mutation } }
})

// prime local cache
initCache()
client.onClearStore(initCache)
client.onResetStore(initCache)
