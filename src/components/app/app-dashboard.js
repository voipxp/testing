import React from 'react'
import { useSession } from '@/graphql'
import { Redirect } from 'react-router-dom'

export const AppDashboard = () => {
  const session = useSession()
  const { loginType, serviceProviderId, groupId, userId } = session

  let route
  switch (loginType) {
    case 'System':
    case 'Provisioning':
      route = '/system'
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
    default:
      route = '/notFound'
  }
  return <Redirect to={route} />
}
