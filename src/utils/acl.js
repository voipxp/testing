import { useReduxState } from 'reactive-react-redux'
import { useCallback } from 'react'

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
  const { session } = useReduxState()
  const { loginType, isPaasAdmin, softwareVersion } = session
  return {
    hasLevel: useCallback(level => hasLevel(loginType, level, isPaasAdmin), [
      isPaasAdmin,
      loginType
    ]),
    hasGroup: useCallback(() => hasGroup(loginType, 'Group'), [loginType]),
    hasServiceProvider: useCallback(
      () => hasServiceProvider(loginType, 'ServiceProvider'),
      [loginType]
    ),
    hasPaasAdmin: useCallback(
      () => hasPaasAdmin(loginType, 'Paas Admin', isPaasAdmin),
      [isPaasAdmin, loginType]
    ),
    hasProvisioning: useCallback(
      () => hasProvisioning(loginType, 'Provisioning'),
      [loginType]
    ),
    hasSystem: useCallback(() => hasSystem(loginType, 'System'), [loginType]),
    hasVersion: useCallback(version => hasVersion(softwareVersion, version), [
      softwareVersion
    ])
  }
}
