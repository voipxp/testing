/*
  Potential redux replacement for alerts
  May also just use apollo
*/
import cuid from 'cuid'
import React from 'react'
import { createContainer } from 'unstated-next'

const reducer = (alerts = [], { type, payload }) => {
  switch (type) {
    case 'ALERT_ADD':
      return alerts.concat(payload)
    case 'ALERT_REMOVE':
      return alerts.filter(alert => alert.id !== (payload.id || payload))
    default:
      return alerts
  }
}

const parse = message => {
  if (!message) return 'Unknown Error'
  if (message.data) return parse(message.data)
  const error = message.error || message.message || message
  return error.toString()
}

const useAlertReducer = () => {
  const [alerts, dispatch] = React.useReducer(reducer, [])
  const alert = async (type, msg, timeout = 3000) => {
    const payload = { id: cuid(), type, message: parse(msg) }
    dispatch({ type: 'ALERT_ADD', payload })
    if (timeout > 0) setTimeout(() => removeAlert(payload), timeout)
    return alert
  }
  const removeAlert = payload => dispatch({ type: 'ALERT_REMOVE', payload })
  const alertPrimary = (msg, ms) => alert('primary', msg, ms)
  const alertLink = (msg, ms) => alert('link', msg, ms)
  const alertInfo = (msg, ms) => alert('info', msg, ms)
  const alertSuccess = (msg, ms) => alert('success', msg, ms)
  const alertWarning = (msg, ms = 5000) => alert('warning', msg, ms)
  const alertDanger = (msg, ms = 10000) => alert('danger', msg, ms)
  return {
    alerts,
    removeAlert,
    alertPrimary,
    alertLink,
    alertInfo,
    alertSuccess,
    alertWarning,
    alertDanger
  }
}

export const Alert = createContainer(useAlertReducer)

export const useAlerts = () => {
  const alerts = Alert.useContainer()
  return alerts
}
