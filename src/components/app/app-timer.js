import React from 'react'
import createActivityDetector from 'activity-detector'
import { useAlerts } from '@/store/alerts'
import { useSession } from '@/store/session'
import { useUi } from '@/store/ui'
import { useUiSettings } from '@/store/ui-settings'

const TIMEOUT = 30000

export const AppTimer = () => {
  const alertRef = React.useRef()
  const timerRef = React.useRef()
  const { clearSession } = useSession()
  const { alertWarning, removeAlert } = useAlerts()
  const { initialized } = useUi()
  const { settings } = useUiSettings()
  const { sessionTimeout } = settings

  const clearSessionLogout = React.useCallback(async () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (alertRef.current) await removeAlert(alertRef.current)
  }, [removeAlert])

  const startSessionLogout = React.useCallback(async () => {
    await clearSessionLogout()
    alertRef.current = await alertWarning('Your session is about to expire', 0)
    timerRef.current = setTimeout(() => clearSession(), TIMEOUT)
  }, [alertWarning, clearSession, clearSessionLogout])

  React.useEffect(() => {
    if (!initialized || !sessionTimeout) return
    const timeToIdle = sessionTimeout * 60 * 1000
    const activityDetector = createActivityDetector({
      timeToIdle,
      inactivityEvents: []
    })
    activityDetector.on('idle', startSessionLogout)
    activityDetector.on('active', clearSessionLogout)
    return () => {
      activityDetector.stop()
      clearSessionLogout()
    }
  }, [clearSessionLogout, initialized, sessionTimeout, startSessionLogout])

  return null
}
