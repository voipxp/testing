import { hot } from 'react-hot-loader/root'
import React from 'react'
import ReactGA from 'react-ga'
import { Section } from 'rbx'
import { useReduxDispatch, useReduxState } from 'reactive-react-redux'
import styled from 'styled-components'
import createActivityDetector from 'activity-detector'
import AngularComponent from '../angular-component'
import {
  AppAlerts,
  AppFooter,
  AppModalLoading,
  AppLogin,
  AppNavbar,
  AppRoutes
} from '@/components/app'
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

  const alertRef = React.useRef()
  const timerRef = React.useRef()

  React.useEffect(() => {
    if (pageGoogleUA) ReactGA.initialize(pageGoogleUA)
  }, [pageGoogleUA])

  React.useEffect(() => {
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
      <AppAlerts />
      {userId ? (
        <>
          <Wrapper>
            <AppNavbar />
            <Section>
              <AppRoutes />
            </Section>
          </Wrapper>
          <AppFooter />
        </>
      ) : (
        <AppLogin />
      )}
      <AngularComponent component="pbsConfirmModal" />
      <AppModalLoading />
    </>
  )
}

export default hot(App)
