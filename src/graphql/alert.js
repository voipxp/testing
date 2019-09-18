import gql from 'graphql-tag'
import cuid from 'cuid'
import get from 'lodash/get'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useCallback } from 'react'

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

export const parseError = error => {
  if (!error) return 'Unknown Error'
  if (error.data) return parseError(error.data)
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    return error.message.replace('GraphQL error: ', '')
  }
  if (error.networkError) {
    const msg = get(error, 'networkError.result.errors.0.message')
    return msg
      ? msg.replace('Context creation failed: ', '')
      : error.networkError.message.replace('Network error: ', '')
  }
  return error.error || error.message || error
}

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

export const useAlerts = () => {
  const { data } = useQuery(ALERTS_QUERY)
  return (data && data.alerts) || []
}

export const useAlert = () => {
  const [create] = useMutation(ALERT_CREATE_MUTATION)
  const [remove] = useMutation(ALERT_DELETE_MUTATION)
  const alert = useCallback(
    (type, msg, timeout) => {
      const input = { id: cuid(), message: parseError(msg), type, timeout }
      return create({ variables: { input } })
    },
    [create]
  )
  return {
    remove: id => remove({ variables: { id } }),
    primary: (msg, ms) => alert('primary', msg, (ms = 3000)),
    link: (msg, ms) => alert('link', msg, (ms = 3000)),
    info: (msg, ms) => alert('info', msg, (ms = 3000)),
    success: (msg, ms) => alert('success', msg, (ms = 3000)),
    warning: (msg, ms) => alert('warning', msg, (ms = 5000)),
    danger: (msg, ms) => alert('danger', msg, (ms = 10000))
  }
}
