import { hot } from 'react-hot-loader/root'
import React from 'react'
import ReactGA from 'react-ga'
import styled from 'styled-components'
import createActivityDetector from 'activity-detector'
import { Section } from 'rbx'
import { useReduxDispatch, useReduxState } from 'reactive-react-redux'
import { AngularComponent } from '@/components/angular-component'
import { UiLoadingPage } from '@/components/ui'
import { useAlerts } from '@/store/alerts'
import { clearSession } from '@/store/session'
import {
  AppAlerts,
  AppFooter,
  AppLoadingModal,
  AppLogin,
  AppNavbar,
  AppRoutes
} from '@/components/app'

const TIMEOUT = 30000

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
`
export const App = hot(() => {
  const state = useReduxState()
  const dispatch = useReduxDispatch()
  const { alertWarning, removeAlert } = useAlerts()
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
      alertRef.current = await alertWarning(msg, TIMEOUT)
      timerRef.current = setTimeout(() => dispatch(clearSession()), TIMEOUT)
    })
    activityDetector.on('active', () => {
      removeAlert(alertRef.current)
      clearTimeout(timerRef.current)
    })
    return () => {
      clearTimeout(timerRef.current)
      activityDetector.stop()
    }
  }, [alertWarning, dispatch, initialized, removeAlert, sessionTimeout, userId])

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
      <AppLoadingModal />
    </>
  )
})
