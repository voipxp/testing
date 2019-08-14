import { useCallback } from 'react'
import { useSession } from '@/graphql'

const hasLevel = (loginType, requiredType, isPaasAdmin) => {
  if (requiredType === 'PaaS Admin' && isPaasAdmin) return true
  const types = {
    'User': 1,
    'Group': 2,
    'Service Provider': 3,
    'Reseller': 4,
    'Provisioning': 5,
    'System': 6
  }
  const user = types[loginType] || 0
  const required = types[requiredType] || 10
  return user >= required
}

const hasVersion = (current, required) => {
  const currentVersion = parseFloat(current.replace('sp', '.'))
  const requiredVersion = parseFloat(required.replace('sp', '.'))
  return currentVersion >= requiredVersion
}

export const useAcl = () => {
  const { loginType, isPaasAdmin, softwareVersion } = useSession()
  return {
    hasLevel: useCallback(level => hasLevel(loginType, level, isPaasAdmin), [
      isPaasAdmin,
      loginType
    ]),
    hasGroup: useCallback(() => hasLevel(loginType, 'Group'), [loginType]),
    hasServiceProvider: useCallback(() => hasLevel(loginType, 'Service Provider'), [loginType]),
    hasReseller: useCallback(() => hasLevel(loginType, 'Reseller'), [loginType]),
    hasPaasAdmin: useCallback(() => hasLevel(loginType, 'Paas Admin', isPaasAdmin), [
      isPaasAdmin,
      loginType
    ]),
    hasProvisioning: useCallback(() => hasLevel(loginType, 'Provisioning'), [loginType]),
    hasSystem: useCallback(() => hasLevel(loginType, 'System'), [loginType]),
    hasVersion: useCallback(version => hasVersion(softwareVersion, version), [softwareVersion])
  }
}
