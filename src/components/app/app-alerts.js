import React from 'react'
import styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Notification, Delete } from 'rbx'
import { AlertEmitter } from '@/utils/alerts'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { ALERTS, ALERT_CREATE, ALERT_REMOVE } from '@/graphql/alerts'

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

export const AppAlerts = () => {
  const { data } = useQuery(ALERTS)
  const [alertRemove] = useMutation(ALERT_REMOVE)
  const [alertCreate] = useMutation(ALERT_CREATE)

  React.useEffect(() => {
    AlertEmitter.on('ALERT_ADD', data => alertCreate(data))
    AlertEmitter.on('ALERT_REMOVE', alert => alertRemove({ variables: alert }))
    return () => AlertEmitter.removeAllListeners()
  }, [alertCreate, alertRemove])

  return (
    <TransitionGroup component={StyledAlerts}>
      {data.alerts.map(alert => (
        <CSSTransition key={alert.id} classNames="notification" timeout={400}>
          <Notification
            as={StyledAlert}
            color={alert.type.toLowerCase()}
            onClick={() => alertRemove({ variables: { id: alert.id } })}
          >
            <Delete as="button" />
            {alert.message}
          </Notification>
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}
