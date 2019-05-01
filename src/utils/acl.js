import { useReduxState } from 'reactive-react-redux'

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
    hasLevel: level => hasLevel(loginType, level, isPaasAdmin),
    hasGroup: () => hasGroup(loginType, 'Group'),
    hasServiceProvider: () => hasServiceProvider(loginType, 'ServiceProvider'),
    hasPaasAdmin: () => hasPaasAdmin(loginType, 'Paas Admin', isPaasAdmin),
    hasProvisioning: () => hasProvisioning(loginType, 'Provisioning'),
    hasSystem: () => hasSystem(loginType, 'System'),
    hasVersion: version => hasVersion(softwareVersion, version)
  }
}
