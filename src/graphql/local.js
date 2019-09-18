import gql from 'graphql-tag'
import { alertCreate, alertDelete } from './alert'
import { sessionLogout } from './session'
import { appUpdate } from './app'

export const resolvers = {
  Mutation: {
    alertCreate: (obj, { input }, { client }) => alertCreate(client, input),
    alertDelete: (obj, { id }, { client }) => alertDelete(client, id),
    appUpdate: (obj, { input }, { client }) => appUpdate(client, input),
    sessionLogout: (obj, _args, { client }) => sessionLogout(client)
  }
}

export const typeDefs = gql`
  extend type Query {
    app: App
    alerts: [Alert!]!
  }
  extend type Mutation {
    alertCreate(input: AlertInput!): Alert
    alertDelete(id: ID!): String
    appUpdate(input: AppInput!): App
    sessionLogout: Session
  }
  type Alert {
    id: ID!
    message: String!
    type: String
    timeout: Int
  }
  input AlertInput {
    id: ID!
    message: String!
    type: String
    timeout: Int
  }
  type App {
    _id: ID!
    loading: Boolean!
  }
  input AppInput {
    _id: ID!
    loading: Boolean
  }
`
