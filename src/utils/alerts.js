import cuid from 'cuid'
import get from 'lodash/get'
import EventEmitter from 'eventemitter3'

export const AlertEmitter = new EventEmitter()

export const removeAlert = payload => AlertEmitter.emit('ALERT_REMOVE', payload)
export const alertPrimary = (msg, ms) => alert('primary', msg, ms)
export const alertLink = (msg, ms) => alert('link', msg, ms)
export const alertInfo = (msg, ms) => alert('info', msg, ms)
export const alertSuccess = (msg, ms) => alert('success', msg, ms)
export const alertWarning = (msg, ms = 5000) => alert('warning', msg, ms)
export const alertDanger = (msg, ms = 10000) => alert('danger', msg, ms)

export default {
  primary: alertPrimary,
  link: alertLink,
  info: alertInfo,
  success: alertSuccess,
  warning: alertWarning,
  danger: alertDanger,
  remove: removeAlert
}

function parse(error) {
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

function alert(type, msg, timeout = 3000) {
  const payload = { id: cuid(), timeout, type, message: parse(msg) }
  AlertEmitter.emit('ALERT_ADD', payload)
  return payload
}
