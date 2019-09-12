import angular from 'angular'
import { ALERT_CREATE_MUTATION, parseError } from '@/graphql'
import cuid from 'cuid'

angular.module('odin.ui').factory('Notification', Notification)

Notification.$inject = ['GraphQL']

function Notification(GraphQL) {
  const alert = (type, msg, timeout) => {
    const input = { id: cuid(), message: parseError(msg), type, timeout }
    return GraphQL.mutate({ mutation: ALERT_CREATE_MUTATION, variables: { input } })
  }
  return {
    primary: (msg, ms) => alert('primary', msg, (ms = 3000)),
    link: (msg, ms) => alert('link', msg, (ms = 3000)),
    info: (msg, ms) => alert('info', msg, (ms = 3000)),
    success: (msg, ms) => alert('success', msg, (ms = 3000)),
    warning: (msg, ms) => alert('warning', msg, (ms = 5000)),
    danger: (msg, ms) => alert('danger', msg, (ms = 10000))
  }
}
