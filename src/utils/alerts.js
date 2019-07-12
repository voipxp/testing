import cuid from 'cuid'
import EventEmitter from 'eventemitter3'

export const AlertEmitter = new EventEmitter()
export const removeAlert = payload => AlertEmitter.emit('ALERT_REMOVE', payload)
export const alertPrimary = (msg, ms) => alert('primary', msg, ms)
export const alertLink = (msg, ms) => alert('link', msg, ms)
export const alertInfo = (msg, ms) => alert('info', msg, ms)
export const alertSuccess = (msg, ms) => alert('success', msg, ms)
export const alertWarning = (msg, ms = 5000) => alert('warning', msg, ms)
export const alertDanger = (msg, ms = 10000) => alert('danger', msg, ms)

function parse(message) {
  if (!message) return 'Unknown Error'
  if (message.data) return parse(message.data)
  const error = message.error || message.message || message
  return error.toString().replace('GraphQL error: ', '')
}

function alert(type, msg, timeout = 3000) {
  const payload = { id: cuid(), timeout, type, message: parse(msg) }
  AlertEmitter.emit('ALERT_ADD', payload)
  return payload
}
