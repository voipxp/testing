import { useSelector } from 'react-redux'
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
  const { session, userViewableServices, userAssignedServices } = useSelector(
    state => ({
      session: state.session,
      userViewableServices: state.userViewableServices,
      userAssignedServices: state.userAssignedServices
    })
  )
  return {
    userViewableServices: useMemo(() => {
      return session.loginType !== 'User'
        ? userAssignedServices[userId]
        : userViewableServices[userId]
    }, [session.loginType, userAssignedServices, userId, userViewableServices]),
    // can pass in a single user service or an array of user services
    // on an array will return true if one is valid
    // eg: ['Shared Call Appearance', 'Shared Call Appearance 5', ...]
    hasUserService: useCallback(
      service => {
        const services = [service].flat()
        return services.find(_service => {
          return hasUserService(
            _service,
            userAssignedServices[userId],
            userViewableServices[userId],
            session.loginType
          )
        })
      },
      [session.loginType, userAssignedServices, userId, userViewableServices]
    )
  }
}
