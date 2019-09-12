import gql from 'graphql-tag'
import { alertCreate, alertDelete } from './alert'

export const resolvers = {
  Mutation: {
    alertCreate: (obj, { input }, { client }) => alertCreate(client, input),
    alertDelete: (obj, { id }, { client }) => alertDelete(client, id)
  }
}

export const typeDefs = gql`
  extend type Query {
    alerts: [Alert!]!
  }
  extend type Mutation {
    alertCreate(input: AlertInput!): Alert
    alertDelete(id: ID!): String
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
`
