import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Dashboard = ({ loginType, serviceProviderId, groupId, userId }) => {
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
Dashboard.propTypes = {
  loginType: PropTypes.string,
  serviceProviderId: PropTypes.string,
  groupId: PropTypes.string,
  userId: PropTypes.string
}

const mapState = ({ session }) => ({
  loginType: session.loginType,
  serviceProviderId: session.serviceProviderId,
  groupId: session.groupId,
  userId: session.userId
})
export default connect(mapState)(Dashboard)
