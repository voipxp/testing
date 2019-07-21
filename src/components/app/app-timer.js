import React from 'react'
import createActivityDetector from 'activity-detector'
import { alertWarning, removeAlert } from '@/utils/alerts'
import { useSession } from '@/store/session'

import gql from 'graphql-tag'
import get from 'lodash/get'
import { useQuery } from '@apollo/react-hooks'

const UI_QUERY = gql`
  query uiSettings {
    uiSettings {
      _id
      sessionTimeout
    }
  }
`

const TIMEOUT = 30000

export const AppTimer = () => {
  const alertRef = React.useRef()
  const timerRef = React.useRef()
  const detectorRef = React.useRef()
  const { clearSession } = useSession()

  const { data } = useQuery(UI_QUERY)
  const sessionTimeout = get(data, 'uiSettings.sessionTimeout')

  const clearSessionLogout = React.useCallback(async () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (alertRef.current) await removeAlert(alertRef.current)
  }, [])

  const startSessionLogout = React.useCallback(async () => {
    await clearSessionLogout()
    alertRef.current = await alertWarning('Your session is about to expire', 0)
    timerRef.current = setTimeout(() => clearSession(), TIMEOUT)
  }, [clearSession, clearSessionLogout])

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
