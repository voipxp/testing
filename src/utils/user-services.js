import { useSelector } from 'react-redux'
import { useCallback, useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const USER_SERVICES_ASSIGNED = gql`
  query userServicesAssigned($userId: String!) {
    userServicesAssigned(userId: $userId) {
      _id
      userId
      userServices {
        serviceName
        isActive
      }
      groupServices {
        serviceName
        isActive
      }
    }
  }
`

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
  const { session, userViewableServices } = useSelector(state => ({
    session: state.session,
    userViewableServices: state.userViewableServices
  }))
  const { data } = useQuery(USER_SERVICES_ASSIGNED, { variables: { userId } })
  const userAssignedServices = data && data.userServicesAssigned
  return {
    userViewableServices: useMemo(() => {
      return session.loginType !== 'User'
        ? userAssignedServices
        : userViewableServices[userId]
    }, [session.loginType, userAssignedServices, userId, userViewableServices]),
    hasUserService: useCallback(
      service => {
        return hasUserService(
          service,
          userAssignedServices,
          userViewableServices[userId],
          session.loginType
        )
      },
      [session.loginType, userAssignedServices, userId, userViewableServices]
    )
  }
}
