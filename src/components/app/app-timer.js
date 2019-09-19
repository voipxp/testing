import React from 'react'
import createActivityDetector from 'activity-detector'
import { useSessionLogout } from '@/graphql'
import { useAlert } from '@/utils'

import gql from 'graphql-tag'
import get from 'lodash/get'
import { useQuery } from '@apollo/react-hooks'

const UI_QUERY = gql`
  query appTimerUi {
    uiSettings {
      id
      sessionTimeout
    }
  }
`

const TIMEOUT = 30000

export const AppTimer = () => {
  const alertRef = React.useRef()
  const timerRef = React.useRef()
  const detectorRef = React.useRef()
  const Alert = useAlert()
  const { data } = useQuery(UI_QUERY)
  const sessionTimeout = get(data, 'uiSettings.sessionTimeout')

  const [logout] = useSessionLogout()

  const clearSessionLogout = React.useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (alertRef.current) Alert.remove(alertRef.current)
  }, [Alert])

  const startSessionLogout = React.useCallback(() => {
    clearSessionLogout()
    alertRef.current = Alert.warning('Your session is about to expire', 0)
    timerRef.current = setTimeout(() => logout(), TIMEOUT)
  }, [Alert, clearSessionLogout, logout])

  const stopDetector = React.useCallback(() => {
    if (detectorRef.current) detectorRef.current.stop()
    clearSessionLogout()
  }, [clearSessionLogout])

  const startDetector = React.useCallback(() => {
    stopDetector()
    const timeToIdle = sessionTimeout * 60 * 1000
    detectorRef.current = createActivityDetector({
      timeToIdle,
      inactivityEvents: []
    })
    detectorRef.current.on('idle', startSessionLogout)
    detectorRef.current.on('active', clearSessionLogout)
  }, [clearSessionLogout, sessionTimeout, startSessionLogout, stopDetector])

  React.useEffect(() => {
    sessionTimeout ? startDetector() : stopDetector()
    return () => stopDetector()
  }, [sessionTimeout, startDetector, stopDetector])

  return null
}
