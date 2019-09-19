import gql from 'graphql-tag'
import cuid from 'cuid'

export const ALERT_CREATE_MUTATION = gql`
  mutation alertCreate($input: AlertInput!) {
    alertCreate(input: $input) @client {
      id
    }
  }
`

export const ALERT_DELETE_MUTATION = gql`
  mutation alertDelete($id: ID!) {
    alertDelete(id: $id) @client
  }
`

export const ALERTS_DEFAULT = { alerts: [] }

export const ALERTS_QUERY = gql`
  query alerts {
    alerts @client {
      id
      message
      type
      timeout
    }
  }
`

export const alertCreate = (cache, input) => {
  const { alerts } = cache.readQuery({ query: ALERTS_QUERY })
  const alert = { __typename: 'Alert', id: cuid(), type: null, timeout: 0, ...input }
  const data = { alerts: [...alerts, alert] }
  cache.writeQuery({ query: ALERTS_QUERY, data })
  if (alert.timeout) setTimeout(() => alertDelete(cache, alert.id), alert.timeout)
  return alert
}

export const alertDelete = (cache, id) => {
  const { alerts } = cache.readQuery({ query: ALERTS_QUERY })
  const data = { alerts: alerts.filter(a => a.id !== id) }
  cache.writeQuery({ query: ALERTS_QUERY, data })
  return { id }
}
