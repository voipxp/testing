import React from 'react'
import { useSession } from '@/store/session'
import { Redirect } from 'react-router-dom'

export const AppDashboard = () => {
  const { session } = useSession()
  const { loginType, serviceProviderId, groupId, userId, resellerId, groupDepartmentPathName } = session

  let route
  switch (loginType) {
    case 'System':
    case 'Provisioning':
      route = '/system'
      break
    case 'Reseller':
      route = `/resellers/${resellerId}`
      break
    case 'Service Provider':
      route = `/serviceProviders/${serviceProviderId}`
      break
    case 'Group':
      route = `/groups/${serviceProviderId}/${groupId}`
      break
    case 'User':
      route = `/users/${serviceProviderId}/${groupId}/${userId}`
      break
    case 'Group Department':
      route = `/department/${serviceProviderId}/${groupId}/${groupDepartmentPathName}`
      break
    default:
      route = '/notFound'
  }
  return <Redirect to={route} />
}
