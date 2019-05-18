import React from 'react'
import createActivityDetector from 'activity-detector'
import { useAlerts } from '@/store/alerts'
import { useSession } from '@/store/session'
import { useUi } from '@/store/ui'
import { useUiSettings } from '@/store/uiSettings'

const TIMEOUT = 30000
const alertRef = React.useRef()
const timerRef = React.useRef()

export const AppTimer = () => {
  const { session, clearSession } = useSession()
  const { userId } = session
  const { alertWarning, removeAlert } = useAlerts()
  const { initialized } = useUi()
  const { settings } = useUiSettings()
  const { sessionTimeout } = settings

  React.useEffect(() => {
    if (!initialized || !userId || !sessionTimeout) return
    const timeToIdle = sessionTimeout * 60 * 1000
    const activityDetector = createActivityDetector({
      timeToIdle,
      inactivityEvents: []
    })
    activityDetector.on('idle', async () => {
      const msg = 'Your session is about to expire'
      alertRef.current = await alertWarning(msg, TIMEOUT)
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
    alertWarning,
    clearSession,
    initialized,
    removeAlert,
    sessionTimeout,
    userId
  ])

  return null
}
