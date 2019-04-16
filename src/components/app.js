import React, { useEffect, useRef } from 'react'
import { Section } from 'rbx'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import createActivityDetector from 'activity-detector'
import Angular from './angular'
import Routes from './routes'
import Alerts from './alerts'
import Footer from './footer'
import { LoadingPage, LoadingModal } from '/components/ui'
import Login from './login'
import Navbar from './navbar'
import { alertWarning, removeAlert } from '/store/alerts'
import { clearSession } from '/store/session'

const TIMEOUT = 30000

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
`
const App = ({
  alertWarning,
  clearSession,
  initialized,
  removeAlert,
  sessionTimeout,
  userId
}) => {
  const alertRef = useRef()
  const timerRef = useRef()

  useEffect(() => {
    if (!initialized || !sessionTimeout || !userId) return
    const timeToIdle = sessionTimeout * 60 * 1000
    const activityDetector = createActivityDetector({
      timeToIdle,
      inactivityEvents: []
    })
    activityDetector.on('idle', async () => {
      alertRef.current = await alertWarning(
        'Your session is about to expire',
        TIMEOUT
      )
      timerRef.current = setTimeout(() => clearSession(), TIMEOUT)
    })
    activityDetector.on('active', () => {
      removeAlert(alertRef.current)
      clearTimeout(timerRef.current)
    })
    return () => {
      clearTimeout(timerRef.current)
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

  if (!initialized) return <LoadingPage />

  return (
    <>
      <Alerts />
      {userId ? (
        <>
          <Wrapper>
            <Navbar />
            <Section>
              <Routes />
            </Section>
          </Wrapper>
          <Footer />
        </>
      ) : (
        <Login />
      )}
      <Angular component="pbsConfirmModal" />
      <LoadingModal />
    </>
  )
}

App.propTypes = {
  alertWarning: PropTypes.func,
  clearSession: PropTypes.func,
  initialized: PropTypes.bool,
  removeAlert: PropTypes.func,
  sessionTimeout: PropTypes.number,
  userId: PropTypes.string
}

const mapState = state => ({
  initialized: state.ui.initialized,
  sessionTimeout: state.ui.settings.sessionTimeout,
  userId: state.session.userId
})

const mapDispatch = { alertWarning, removeAlert, clearSession }

export default connect(
  mapState,
  mapDispatch
)(App)
