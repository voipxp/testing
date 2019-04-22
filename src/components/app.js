import React, { useEffect, useRef } from 'react'
import ReactGA from 'react-ga'
import { Section } from 'rbx'
import { useReduxDispatch, useReduxState } from 'reactive-react-redux'
import styled from 'styled-components'
import createActivityDetector from 'activity-detector'
import AngularComponent from './angular-component'
import Routes from './routes'
import Alerts from './alerts'
import Footer from './footer'
import LoadingModal from './loading-modal'
import Login from './login'
import Navbar from './navbar'
import { UiLoadingPage } from '@/components/ui'
import { alertWarning, removeAlert } from '@/store/alerts'
import { clearSession } from '@/store/session'

const TIMEOUT = 30000

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
`
const App = () => {
  const state = useReduxState()
  const dispatch = useReduxDispatch()
  const { initialized } = state.ui
  const { sessionTimeout } = state.ui.settings
  const { pageGoogleUA } = state.ui.template
  const { userId } = state.session

  const alertRef = useRef()
  const timerRef = useRef()

  useEffect(() => {
    if (pageGoogleUA) ReactGA.initialize(pageGoogleUA)
  }, [pageGoogleUA])

  useEffect(() => {
    if (!initialized || !sessionTimeout || !userId) return
    const timeToIdle = sessionTimeout * 60 * 1000
    const activityDetector = createActivityDetector({
      timeToIdle,
      inactivityEvents: []
    })
    activityDetector.on('idle', async () => {
      const msg = 'Your session is about to expire'
      alertRef.current = await dispatch(alertWarning(msg, TIMEOUT))
      timerRef.current = setTimeout(() => dispatch(clearSession()), TIMEOUT)
    })
    activityDetector.on('active', () => {
      dispatch(removeAlert(alertRef.current))
      clearTimeout(timerRef.current)
    })
    return () => {
      clearTimeout(timerRef.current)
      activityDetector.stop()
    }
  }, [dispatch, initialized, sessionTimeout, userId])

  if (!initialized) return <UiLoadingPage />

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
      <AngularComponent component="pbsConfirmModal" />
      <LoadingModal />
    </>
  )
}

export default App
