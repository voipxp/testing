import { useReduxState } from 'reactive-react-redux'
import { useCallback, useMemo } from 'react'

const isAssigned = (serviceName, assigned = {}) => {
  const userServices = assigned.userServices || []
  return userServices.find(service => service.serviceName === serviceName)
}

const isViewable = (serviceName, viewable = {}, loginType) => {
  if (loginType !== 'User') return true
  const viewableServices = viewable.userServices || []
  return viewableServices.find(service => service.serviceName === serviceName)
}

const hasUserService = (services, assigned, viewable, loginType) => {
  if (!services) return false
  if (Array.isArray(services)) {
    return services.find(service => {
      return hasUserService(service, assigned, viewable, loginType)
    })
  }
  const serviceName = services.serviceName || services.name || services
  switch (serviceName) {
    case 'Call Center':
      return [
        'Call Center - Basic',
        'Call Center - Standard',
        'Call Center - Premium'
      ].find(
        service =>
          isAssigned(service, assigned) &&
          isViewable(service, viewable, loginType)
      )
    case 'Shared Call Appearance':
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
          isAssigned(service, assigned) &&
          isViewable(service, viewable, loginType)
      )
    default:
      return (
        isAssigned(serviceName, assigned) &&
        isViewable(serviceName, viewable, loginType)
      )
  }
}

export const useUserServicePermissions = userId => {
  const {
    session,
    userViewableServices,
    userAssignedServices
  } = useReduxState()
  return {
    userViewableServices: useMemo(() => {
      return session.loginType !== 'User'
        ? userAssignedServices[userId]
        : userViewableServices[userId]
    }, [session.loginType, userAssignedServices, userId, userViewableServices]),
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
