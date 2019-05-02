import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useAcl } from '@/utils/acl'
import { withRouter } from 'react-router'
import { Breadcrumb } from 'rbx'

const StyledBreadcrumb = styled.div`
  margin-top: -2rem;
  margin-bottom: 1rem;
`
const AppBreadcrumb = ({ match, children }) => {
  const { serviceProviderId, groupId, userId } = match.params
  const acl = useAcl()
  const hasGroup = acl.hasGroup()
  const hasServiceProvider = acl.hasServiceProvider()
  const hasProvisioning = acl.hasProvisioning()

  return (
    <Breadcrumb as={StyledBreadcrumb}>
      <Breadcrumb.Item href="#!/">Dashboard</Breadcrumb.Item>
      {hasProvisioning && (
        <Breadcrumb.Item href="#!/serviceProviders">
          Service Providers
        </Breadcrumb.Item>
      )}
      {hasServiceProvider && serviceProviderId && (
        <Breadcrumb.Item href={`#!/serviceProviers/${serviceProviderId}`}>
          {serviceProviderId}
        </Breadcrumb.Item>
      )}
      {hasServiceProvider && (
        <Breadcrumb.Item
          href={`#!/serviceProviders/${serviceProviderId}/groups`}
        >
          Groups
        </Breadcrumb.Item>
      )}
      {hasGroup && groupId && (
        <Breadcrumb.Item href={`#!/groups/${serviceProviderId}/${groupId}`}>
          {groupId}
        </Breadcrumb.Item>
      )}
      {hasGroup && (
        <Breadcrumb.Item
          href={`#!/groups/${serviceProviderId}/${groupId}/users`}
        >
          Users
        </Breadcrumb.Item>
      )}
      {userId && (
        <Breadcrumb.Item
          href={`#!/users/${serviceProviderId}/${groupId}/${userId}`}
        >
          {userId}
        </Breadcrumb.Item>
      )}
      {children}
    </Breadcrumb>
  )
}

AppBreadcrumb.propTypes = {
  match: PropTypes.object,
  children: PropTypes.any
}

export default withRouter(AppBreadcrumb)
