import { useSelector } from 'react-redux'
import { useCallback } from 'react'

const hasLevel = (loginType, requiredType) => {
  const types = {
    'User': 1,
    'Group Department': 2,
    'Group': 3,
    'Service Provider': 4,
    'Reseller': 5,
    'Provisioning': 6,
    'System': 7
  }
  const user = types[loginType] || 0
  const required = types[requiredType] || 10
  return user >= required
}

const hasUser = type => hasLevel(type, 'User')
const hasGroup = type => hasLevel(type, 'Group')
const hasGroupDepartment = type => hasLevel(type, 'Group Department')
const hasServiceProvider = type => hasLevel(type, 'Service Provider')
const hasReseller = type => hasLevel(type, 'Reseller')
const hasProvisioning = type => hasLevel(type, 'Provisioning')
const hasSystem = type => hasLevel(type, 'System')

const hasVersion = (current, required) => {
  const currentVersion = parseFloat(current.replace('sp', '.'))
  const requiredVersion = parseFloat(required.replace('sp', '.'))
  return currentVersion >= requiredVersion
}

const hasPolicy = (policies, allowed_policy) => {
  return policies[allowed_policy] !== 'None'
}

const is = (loginType, type) => {
  return loginType === type
}

export const useAcl = () => {
  const session = useSelector(state => state.session)
  const { loginType, isPaasAdmin, softwareVersion, policy } = session
  return {
    isLevel: useCallback(level => loginType === level, [loginType]),
    isPaasAdmin: useCallback(() => isPaasAdmin, [isPaasAdmin]),
    hasLevel: useCallback(level => hasLevel(loginType, level), [loginType]),
    hasUser: useCallback(() => hasUser(loginType, 'Group'), [loginType]),
    hasGroup: useCallback(() => hasGroup(loginType, 'Group'), [loginType]),
    hasGroupDepartment: useCallback(
      () => hasGroupDepartment(loginType, 'Group Department'),
      [loginType]
    ),
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
    ]),
    hasPolicy: useCallback(
      allowed_policy => hasPolicy(policy, allowed_policy),
      [policy]
    ),
    is: useCallback(type => is(loginType, type), [loginType])
  }
}
