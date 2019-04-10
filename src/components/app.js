import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import createActivityDetector from 'activity-detector'
import Alerts from './alerts'
import Angular from './angular'
import Footer from './footer'
import Loading from './loading'
import Login from './login'
import { alertWarning, removeAlert } from '/store/alerts'
import { clearSession } from '/store/session'

const TIMEOUT = 3000

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
`
const App = ({
  initialized,
  sessionTimeout,
  alertWarning,
  removeAlert,
  clearSession,
  userId
}) => {
  useEffect(() => {
    if (!initialized || !sessionTimeout || !userId) return
    let timer
    let warning
    // const timeToIdle = sessionTimeout * 60 * 1000
    const timeToIdle = 1000
    const activityDetector = createActivityDetector({ timeToIdle })
    activityDetector.on('idle', async () => {
      warning = await alertWarning('Your session is about to expire', TIMEOUT)
      timer = setTimeout(() => clearSession(), TIMEOUT)
    })
    activityDetector.on('active', () => {
      removeAlert(warning)
      clearTimeout(timer)
    })
    return () => {
      clearTimeout(timer)
      activityDetector.stop()
    }
  }, [
    sessionTimeout,
    alertWarning,
    removeAlert,
    initialized,
    clearSession,
    userId
  ])

  if (!initialized) return <Loading />

  return (
    <>
      <Alerts />
      {userId ? (
        <>
          <Wrapper>
            <Angular component="pbsApp" />
          </Wrapper>
          <Footer />
        </>
      ) : (
        <Login />
      )}
    </>
  )
}

App.propTypes = {
  initialized: PropTypes.bool,
  userId: PropTypes.string,
  sessionTimeout: PropTypes.number,
  alertWarning: PropTypes.func,
  removeAlert: PropTypes.func,
  clearSession: PropTypes.func
}

const mapState = state => ({
  userId: state.session.userId,
  sessionTimeout: state.ui.settings.sessionTimeout,
  initialized: state.ui.initialized
})
const mapDispatch = { alertWarning, removeAlert, clearSession }
export default connect(
  mapState,
  mapDispatch
)(App)
