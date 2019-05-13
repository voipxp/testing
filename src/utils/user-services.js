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

const hasUserService = (service, assigned, viewable, loginType) => {
  const serviceName = service.serviceName || service.name || service
  return (
    isAssigned(serviceName, assigned) &&
    isViewable(serviceName, viewable, loginType)
  )
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
