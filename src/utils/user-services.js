import { useReduxState } from 'reactive-react-redux'
import { useCallback } from 'react'

const hasUserService = (services, assigned, viewable, loginType) => {
  if (!services) return false
  if (Array.isArray(services)) {
    return !!services.find(service =>
      hasUserService(service, assigned, viewable, loginType)
    )
  }
  const serviceName = services.serviceName || services.name || services
  if (serviceName === 'Call Center') {
    return [
      'Call Center - Basic',
      'Call Center - Standard',
      'Call Center - Premium'
    ].find(
      service =>
        isAssigned(serviceName, assigned) &&
        isViewable(serviceName, viewable, loginType)
    )
  } else if (serviceName === 'Shared Call Appearance') {
    return [
      'Shared Call Appearance',
      'Shared Call Appearance 5',
      'Shared Call Appearance 10',
      'Shared Call Appearance 15',
      'Shared Call Appearance 20',
      'Shared Call Appearance 25',
      'Shared Call Appearance 30',
      'Shared Call Appearance 35'
    ].find(
      service =>
        isAssigned(serviceName, assigned) &&
        isViewable(serviceName, viewable, loginType)
    )
  } else {
    return (
      isAssigned(serviceName, assigned) &&
      isViewable(serviceName, viewable, loginType)
    )
  }
}

const isAssigned = (serviceName, assigned = {}) => {
  const userServices = assigned.userServices || []
  return userServices.find(service => service.serviceName === serviceName)
}

const isViewable = (serviceName, viewable = {}, loginType) => {
  if (loginType !== 'User') return true
  const viewableServices = viewable.userServices || []
  return viewableServices.find(service => service.serviceName === serviceName)
}

export const useUserServicePermissions = userId => {
  const {
    session,
    userViewableServices,
    userAssignedServices
  } = useReduxState()
  return {
    hasUserService: useCallback(
      service => {
        return hasUserService(
          service,
          userAssignedServices[userId],
          userViewableServices[userId],
          session.loginType
        )
      },
      [session.loginType, userAssignedServices, userId, userViewableServices]
    )
  }
}
