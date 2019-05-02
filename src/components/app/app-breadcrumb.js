import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Breadcrumb } from 'rbx'

const StyledBreadcrumb = styled.div`
  margin-top: -2rem;
  margin-bottom: 1rem;
`
const AppBreadcrumb = ({ match }) => {
  const { serviceProviderId, groupId, userId } = match.params
  return (
    <Breadcrumb as={StyledBreadcrumb}>
      <Breadcrumb.Item href="#!/">Dashboard</Breadcrumb.Item>
      <Breadcrumb.Item href="#!/">Service Providers</Breadcrumb.Item>
      <Breadcrumb.Item href="#!/">{serviceProviderId}</Breadcrumb.Item>
      <Breadcrumb.Item href="#!/">Groups</Breadcrumb.Item>
      <Breadcrumb.Item href="#!/">{groupId}</Breadcrumb.Item>
      <Breadcrumb.Item href="#!/">Users</Breadcrumb.Item>
      <Breadcrumb.Item href="#!/">{userId}</Breadcrumb.Item>
    </Breadcrumb>
  )
}

AppBreadcrumb.propTypes = {
  match: PropTypes.object
}

export default withRouter(AppBreadcrumb)
