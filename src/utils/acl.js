import { useSelector } from 'react-redux'
import { useCallback } from 'react'

const hasLevel = (loginType, requiredType) => {
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

const hasUser = type => hasLevel(type, 'User')
const hasGroup = type => hasLevel(type, 'Group')
const hasServiceProvider = type => hasLevel(type, 'Service Provider')
const hasReseller = type => hasLevel(type, 'Reseller')
const hasProvisioning = type => hasLevel(type, 'Provisioning')
const hasSystem = type => hasLevel(type, 'System')

const hasVersion = (current, required) => {
  const currentVersion = parseFloat(current.replace('sp', '.'))
  const requiredVersion = parseFloat(required.replace('sp', '.'))
  return currentVersion >= requiredVersion
}

export const useAcl = () => {
  const session = useSelector(state => state.session)
  const { loginType, isPaasAdmin, softwareVersion } = session
  return {
    isLevel: useCallback(level => loginType === level, [loginType]),
    isPaasAdmin: useCallback(() => isPaasAdmin, [isPaasAdmin]),
    hasLevel: useCallback(level => hasLevel(loginType, level), [loginType]),
    hasUser: useCallback(() => hasUser(loginType, 'Group'), [loginType]),
    hasGroup: useCallback(() => hasGroup(loginType, 'Group'), [loginType]),
    hasServiceProvider: useCallback(
      () => hasServiceProvider(loginType, 'ServiceProvider'),
      [loginType]
    ),
    hasReseller: useCallback(() => hasReseller(loginType, 'Reseller'), [
      loginType
    ]),
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
