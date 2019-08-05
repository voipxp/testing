import { useCallback, useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import gql from 'graphql-tag'
import { useSession } from '@/graphql'

const USER_SERVICES = gql`
  query userServicesAssignedAndViewable($userId: String!) {
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
    userServicesViewable(userId: $userId) {
      _id
      userId
      userServices {
        serviceName
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
  const session = useSession()
  const { data } = useQuery(USER_SERVICES, { variables: { userId } })
  const assigned = get(data, 'userServicesAssigned', { userServices: [] })
  const viewable = get(data, 'userServicesViewable', { userServices: [] })
  return {
    userViewableServices: useMemo(() => {
      return {
        ...assigned,
        userServices: assigned.userServices.filter(service => {
          return hasUserService(service, assigned, viewable, session.loginType)
        })
      }
    }, [assigned, session.loginType, viewable]),
    hasUserService: useCallback(
      service => {
        return hasUserService(service, assigned, viewable, session.loginType)
      },
      [assigned, session.loginType, viewable]
    )
  }
}
