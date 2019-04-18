import React from 'react'
import { useReduxState } from 'reactive-react-redux'
import { Redirect } from 'react-router-dom'

const Dashboard = () => {
  const state = useReduxState()
  const { loginType, serviceProviderId, groupId, userId } = state.session

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

export default Dashboard
