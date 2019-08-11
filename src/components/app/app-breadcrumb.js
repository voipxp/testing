import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useAcl } from '@/utils'
import { withRouter } from 'react-router'
import { Breadcrumb } from 'rbx'

const StyledBreadcrumb = styled.div`
  margin-top: -2rem;
  margin-bottom: 1rem;
`
export const AppBreadcrumbBase = ({ match, children }) => {
  const { serviceProviderId, groupId, userId } = match.params
  const Acl = useAcl()
  const hasGroup = Acl.hasGroup()
  const hasServiceProvider = Acl.hasServiceProvider()
  const hasProvisioning = Acl.hasProvisioning()

  return (
    <Breadcrumb as={StyledBreadcrumb}>
      <Breadcrumb.Item href="#!/">Dashboard</Breadcrumb.Item>

      {hasProvisioning && serviceProviderId && (
        <Breadcrumb.Item href="#!/serviceProviders">
          Service Providers
        </Breadcrumb.Item>
      )}
      {hasServiceProvider && serviceProviderId && (
        <Breadcrumb.Item href={`#!/serviceProviders/${serviceProviderId}`}>
          {serviceProviderId}
        </Breadcrumb.Item>
      )}

      {hasServiceProvider && groupId && (
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

      {hasGroup && userId && (
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

AppBreadcrumbBase.propTypes = {
  match: PropTypes.object,
  children: PropTypes.any
}

export const AppBreadcrumb = withRouter(AppBreadcrumbBase)
