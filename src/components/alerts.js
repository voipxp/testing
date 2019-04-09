import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { removeAlert } from '/store/alerts'

const StyledAlerts = styled.div`
  text-align: centered;
  position: fixed;
  top: 5px;
  right: 5px;
  width: 400px;
  margin: 0;
  padding: 0;
  z-index: 60;
`

const StyledAlert = styled.div`
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

const Alerts = ({ alerts, removeAlert }) => {
  return (
    <TransitionGroup component={StyledAlerts}>
      {alerts.map(alert => (
        <CSSTransition key={alert.id} classNames="notification" timeout={400}>
          <StyledAlert
            className={`notification is-${alert.type}`}
            onClick={() => removeAlert(alert)}
          >
            <button className="delete" />
            {alert.message}
          </StyledAlert>
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}

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
