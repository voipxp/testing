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
export const hasSystem = type => hasLevel(type, 'System')

export default {
  hasLevel,
  hasGroup,
  hasServiceProvider,
  hasProvisioning,
  hasSystem
}
