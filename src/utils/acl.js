import { useSelector } from 'react-redux'
import { useCallback } from 'react'
import { useSession } from '@/graphql'
export const hasLevel = (loginType, requiredType, isPaasAdmin) => {
  if (requiredType === 'PaaS Admin' && isPaasAdmin) return true
  const types = {
    'User': 1,
    'Group': 2,
    'Service Provider': 3,
    'PaaS Admin': 3.5,
    'Provisioning': 4,
    'System': 5
  }
  const user = types[loginType] || 0
  const required = types[requiredType] || 10
  return user >= required
}

export const hasGroup = type => hasLevel(type, 'Group')
export const hasServiceProvider = type => hasLevel(type, 'Service Provider')
export const hasProvisioning = type => hasLevel(type, 'Provisioning')
export const hasPaasAdmin = type => hasLevel(type, 'Paas Admin')
export const hasSystem = type => hasLevel(type, 'System')

export const hasVersion = (current, required) => {
  const currentVersion = parseFloat(current.replace('sp', '.'))
  const requiredVersion = parseFloat(required.replace('sp', '.'))
  return currentVersion >= requiredVersion
}

export default {
  hasLevel,
  hasGroup,
  hasServiceProvider,
  hasPaasAdmin,
  hasProvisioning,
  hasSystem,
  hasVersion
}

export const useAcl = () => {
  const { session } = useSession()
  return {
    hasLevel: useCallback(
      level => hasLevel(session.loginType, level, session.isPaasAdmin),
      [session.isPaasAdmin, session.loginType]
    ),
    hasGroup: useCallback(() => hasGroup(session.loginType, 'Group'), [
      session.loginType
    ]),
    hasServiceProvider: useCallback(
      () => hasServiceProvider(session.loginType, 'ServiceProvider'),
      [session.loginType]
    ),
    hasPaasAdmin: useCallback(
      () => hasPaasAdmin(session.loginType, 'Paas Admin', session.isPaasAdmin),
      [session.isPaasAdmin, session.loginType]
    ),
    hasProvisioning: useCallback(
      () => hasProvisioning(session.loginType, 'Provisioning'),
      [session.loginType]
    ),
    hasSystem: useCallback(() => hasSystem(session.loginType, 'System'), [
      session.loginType
    ]),
    hasVersion: useCallback(
      version => hasVersion(session.softwareVersion, version),
      [session.softwareVersion]
    )
  }
}
