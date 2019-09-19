import { useCallback, useMemo } from 'react'
import { useUserServicesAssignedAndViewable } from '@/graphql'
import { useSession } from '@/utils'

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
