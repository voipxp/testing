import gql from 'graphql-tag'
import cuid from 'cuid'
import { useMutation } from '@apollo/react-hooks'

export const ALERTS = gql`
  query alerts {
    alerts @client {
      id
      type
      timeout
      message
    }
  }
`

export const ALERT_CREATE = gql`
  mutation alertCreate(
    $id: ID!
    $type: AlertType! = PRIMARY
    $timeout: Int = 3000
    $message: String!
  ) {
    alertCreate(id: $id, type: $type, timeout: $timeout, message: $message)
      @client {
      id
      type
      timeout
      message
    }
  }
`

export const ALERT_REMOVE = gql`
  mutation alertRemove($id: ID!) {
    alertRemove(id: $id) @client {
      id
    }
  }
`

export const typeDefs = gql`
  enum AlertType {
    PRIMARY
    LINK
    INFO
    SUCCESS
    WARNING
    DANGER
  }
  type Alert {
    id: ID!
    type: AlertType!
    timeout: Int
    message: String!
  }
  extend type Query {
    alerts: [Alert!]!
  }
  extend type Mutation {
    alertCreate(
      id: ID!
      type: AlertType!
      timeout: Int
      message: String
    ): Alert!
    alertRemove(id: ID!): Alert!
  }
`

export const Mutation = {
  alertCreate(obj, args, { cache, client }) {
    const { alerts } = client.readQuery({ query: ALERTS })
    const id = cuid()
    const alert = { ...args, id, __typename: 'Alert' }
    cache.writeQuery({
      query: ALERTS,
      data: { alerts: [...alerts, alert] }
    })
    if (alert.timeout && alert.timeout > 0) {
      setTimeout(() => autoRemove(id), alert.timeout)
    }
    return alert
    function autoRemove(id) {
      const { alerts } = client.readQuery({ query: ALERTS })
      client.writeQuery({
        query: ALERTS,
        data: { alerts: alerts.filter(a => a.id !== id) }
      })
    }
  },
  alertRemove(obj, { id }, { client }) {
    const { alerts } = client.readQuery({ query: ALERTS })
    const alert = { __typename: 'Alert', id }
    client.writeQuery({
      query: ALERTS,
      data: { alerts: alerts.filter(a => a.id !== id) }
    })
    return alert
  }
}

export const useAlerts = () => {
  const [alertCreate] = useMutation(ALERT_CREATE)
  const alert = (type, message, timeout = 3000) => {
    return alertCreate({ variables: { type, message, timeout } })
  }
  const alertPrimary = (msg, ms) => alert('PRIMARY', msg, ms)
  const alertLink = (msg, ms) => alert('LINK', msg, ms)
  const alertInfo = (msg, ms) => alert('INFO', msg, ms)
  const alertSuccess = (msg, ms) => alert('SUCCESS', msg, ms)
  const alertWarning = (msg, ms = 5000) => alert('WARNING', msg, ms)
  const alertDanger = (msg, ms = 10000) => alert('DANGER', msg, ms)
  return {
    alertPrimary,
    alertLink,
    alertInfo,
    alertSuccess,
    alertWarning,
    alertDanger
  }
}
