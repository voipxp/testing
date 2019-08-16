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
  const { serviceProviderId, groupId, resellerId, userId } = match.params
  const acl = useAcl()
  const hasGroup = acl.hasGroup()
  const hasServiceProvider = acl.hasServiceProvider()
  const hasReseller = acl.hasReseller()
  const hasProvisioning = acl.hasProvisioning()

  return (
    <Breadcrumb as={StyledBreadcrumb}>
      <Breadcrumb.Item href="#!/">Dashboard</Breadcrumb.Item>

      {hasProvisioning && resellerId && (
        <>
          <Breadcrumb.Item href="#!/system/resellers">Resellers</Breadcrumb.Item>
          <Breadcrumb.Item href={`#!/resellers/${resellerId}`}>{resellerId}</Breadcrumb.Item>
        </>
      )}

      {hasReseller && serviceProviderId && (
        <>
          <Breadcrumb.Item href="#!/serviceProviders">Service Providers</Breadcrumb.Item>
          <Breadcrumb.Item href={`#!/serviceProviders/${serviceProviderId}`}>
            {serviceProviderId}
          </Breadcrumb.Item>
        </>
      )}

      {hasServiceProvider && groupId && (
        <>
          <Breadcrumb.Item href={`#!/serviceProviders/${serviceProviderId}/groups`}>
            Groups
          </Breadcrumb.Item>
          <Breadcrumb.Item href={`#!/groups/${serviceProviderId}/${groupId}`}>
            {groupId}
          </Breadcrumb.Item>
        </>
      )}

      {hasGroup && userId && (
        <>
          <Breadcrumb.Item href={`#!/groups/${serviceProviderId}/${groupId}/users`}>
            Users
          </Breadcrumb.Item>
          <Breadcrumb.Item href={`#!/users/${serviceProviderId}/${groupId}/${userId}`}>
            {userId}
          </Breadcrumb.Item>
        </>
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
