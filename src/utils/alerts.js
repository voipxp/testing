import cuid from 'cuid'
import get from 'lodash/get'
import EventEmitter from 'eventemitter3'

export const AlertEmitter = new EventEmitter()

const parse = error => {
  if (!error) return 'Unknown Error'
  if (error.data) return parse(error.data)
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

const alert = (type, msg, timeout = 3000) => {
  const payload = { id: cuid(), timeout, type, message: parse(msg) }
  setTimeout(() => AlertEmitter.emit('ALERT_ADD', payload), 0)
  return payload
}

const removeAlert = payload => AlertEmitter.emit('ALERT_REMOVE', payload)
const alertPrimary = (msg, ms) => alert('primary', msg, ms)
const alertLink = (msg, ms) => alert('link', msg, ms)
const alertInfo = (msg, ms) => alert('info', msg, ms)
const alertSuccess = (msg, ms) => alert('success', msg, ms)
const alertWarning = (msg, ms = 5000) => alert('warning', msg, ms)
const alertDanger = (msg, ms = 10000) => alert('danger', msg, ms)

export const Alert = {
  primary: alertPrimary,
  link: alertLink,
  info: alertInfo,
  success: alertSuccess,
  warning: alertWarning,
  danger: alertDanger,
  remove: removeAlert
}
