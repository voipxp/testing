import { useCallback, useMemo } from 'react'
import { useSession } from '@/utils'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import { USER_SERVICES_ASSIGNED_AND_VIEWABLE_QUERY, USER_SERVICES_QUERY } from '@/graphql'

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
  return isAssigned(serviceName, assigned) && isViewable(serviceName, viewable, loginType)
}

export const useUserServicePermissions = userId => {
  const { loginType } = useSession()
  const { assigned, viewable, loading } = useUserServicesAssignedAndViewable(userId)
  return {
    loading,
    userViewableServices: useMemo(() => {
      return {
        ...assigned,
        userServices: assigned.userServices.filter(service => {
          return hasUserService(service, assigned, viewable, loginType)
        })
      }
    }, [assigned, loginType, viewable]),
    hasUserService: useCallback(
      service => {
        const services = [service].flat()
        return services.find(_service => hasUserService(_service, assigned, viewable, loginType))
      },
      [assigned, loginType, viewable]
    )
  }
}

export const useUserServicesAssignedAndViewable = userId => {
  const { data, loading, error } = useQuery(USER_SERVICES_ASSIGNED_AND_VIEWABLE_QUERY, {
    variables: { userId }
  })
  const assigned = get(data, 'userServicesAssigned', { userServices: [] })
  const viewable = get(data, 'userServicesViewable', { userServices: [] })
  return { assigned, viewable, loading, error }
}

export const useUserServices = userId => {
  const { data, loading, error } = useQuery(USER_SERVICES_QUERY, {
    variables: { userId }
  })
  const userServices = get(data, 'userServices', { userServices: [] })
  const servicePacks = get(data, 'userServices', { servicePacks: [] })
  return { userServices, servicePacks, loading, error }
}
