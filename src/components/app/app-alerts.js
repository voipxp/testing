import React from 'react'
import styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Notification, Delete } from 'rbx'
import { AlertEmitter } from '@/utils'

const StyledAlerts = styled.div`
  text-align: center;
  position: fixed;
  top: 5px;
  right: 5px;
  width: 400px;
  margin: 0;
  padding: 0;
  z-index: 60;
`

const StyledAlert = styled.div`
  text-align: center;
  &.notification-exit {
    animation-name: lightSpeedOut;
    animation-duration: 450ms;
  }
  &.notification-enter {
    animation-name: lightSpeedIn;
    animation-duration: 450ms;
  }
  &:hover {
    cursor: pointer;
  }
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`

const removeAlert = payload => ({ type: 'ALERT_REMOVE', payload })
const addAlert = payload => ({ type: 'ALERT_ADD', payload })

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

export const AppAlerts = () => {
  const [alerts, dispatch] = React.useReducer(reducer, [])

  React.useEffect(() => {
    AlertEmitter.on('ALERT_ADD', alert => {
      dispatch(addAlert(alert))
      if (alert.timeout > 0) {
        setTimeout(() => dispatch(removeAlert(alert)), alert.timeout)
      }
    })
    AlertEmitter.on('ALERT_REMOVE', alert => dispatch(removeAlert(alert)))
    return () => AlertEmitter.removeAllListeners()
  }, [])

  return (
    <TransitionGroup component={StyledAlerts}>
      {alerts.map(alert => (
        <CSSTransition key={alert.id} classNames="notification" timeout={400}>
          <Notification
            as={StyledAlert}
            color={alert.type}
            onClick={() => dispatch(removeAlert(alert))}
          >
            <Delete as="button" />
            {alert.message}
          </Notification>
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}
