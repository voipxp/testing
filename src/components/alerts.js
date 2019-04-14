import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import { Notification, Delete } from 'rbx'
import styled from 'styled-components'
import { removeAlert } from '/store/alerts'

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
    animation-duration: 400ms;
  }
  &.notification-enter {
    animation-name: lightSpeedIn;
    animation-duration: 400ms;
  }
  &:hover {
    cursor: pointer;
  }
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`

const Alerts = ({ alerts, removeAlert }) => (
  <TransitionGroup component={StyledAlerts}>
    {alerts.map(alert => (
      <CSSTransition key={alert.id} classNames="notification" timeout={400}>
        <Notification
          as={StyledAlert}
          color={alert.type}
          onClick={() => removeAlert(alert)}
        >
          <Delete as="button" />
          {alert.message}
        </Notification>
      </CSSTransition>
    ))}
  </TransitionGroup>
)

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired
}

const mapState = ({ alerts }) => ({ alerts })

const mapDispatch = { removeAlert }

export default connect(
  mapState,
  mapDispatch
)(Alerts)
