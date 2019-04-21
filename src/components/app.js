import React, { useEffect, useRef } from 'react'
import ReactGA from 'react-ga'
import { Section } from 'rbx'
import { useReduxDispatch, useReduxState } from 'reactive-react-redux'
import { Helmet } from 'react-helmet'
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
  const { initialized, apiUrl } = state.ui
  const { sessionTimeout } = state.ui.settings
  const { pageGoogleUA, pageTitle } = state.ui.template
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

  console.log('pageTitle', pageTitle)
  console.log('apiUrl', apiUrl)

  return (
    <>
      <Helmet>
        <meta name="apple-mobile-web-app-title" content={pageTitle} />
        <link
          href={`${apiUrl}/ui/images/imageIcon.png?size=180x180`}
          sizes="180x180"
          rel="apple-touch-icon"
        />
        <link
          rel="icon"
          sizes="32x32"
          type="image/png"
          href={`${apiUrl}/ui/images/imageIcon.png?size=32x32`}
        />
        <link
          rel="icon"
          sizes="16x16"
          type="image/png"
          href={`${apiUrl}/ui/images/imageIcon.png?size=32x32`}
        />
      </Helmet>
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
