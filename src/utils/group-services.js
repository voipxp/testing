import { useSelector } from 'react-redux'
import { useCallback, useMemo } from 'react'
import _ from 'lodash'

const isAssigned = (serviceName, assigned = {}) => {
  const groupServices = assigned || []
  return _.includes(groupServices, serviceName)
}

const hasGroupService = (service, assigned, loginType) => {
  const serviceName = service.serviceName || service.name || service
  return (
    isAssigned(serviceName, assigned)
  )
}

export const useGroupServicePermissions = groupId => {
  const { session, groupAssignedServices } = useSelector(
    state => ({
      session: state.session,
      groupAssignedServices: state.groupServices
    })
  )
  return {
    hasGroupService: useCallback(
      service => {
        const services = [service].flat()
        return services.find(_service => {
          return hasGroupService(
            _service,
            groupAssignedServices[groupId],
            session.loginType
          )
        })
      },
      [session.loginType, groupAssignedServices, groupId]
    )
  }
}
