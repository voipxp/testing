import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Column, Box } from 'rbx'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Breadcrumb from './breadcrumb'

const StyledMenu = styled.div`
  background-color: white;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  padding: 1rem;
`

const CallRecords = () => (
  <Box>
    <p>Call Records</p>
  </Box>
)

const FeatureQuickSet = () => (
  <Box>
    <p>Feature Quick Set</p>
  </Box>
)

// const StyledContent = styled.div`
//   padding-top: 1rem;
//   padding-left: 1rem;
// `

const route = component => {
  let path =
    '#!/users/ent.odin/grp.odin/144001-copy2@microv-works.com/dashboard'
  if (component) {
    path = `${path}/${component}`
  }
  return path
}

const renderComponent = ({ match }) => {
  const { component } = match.params
  switch (component) {
    case 'callRecords':
      return <CallRecords />
    case 'featureQuickSet':
      return <FeatureQuickSet />
    default: {
      let path = route('callRecords')
      path = path.replace(/#!/, '')
      return <Redirect to={path} />
    }
  }
}

renderComponent.propTypes = {
  match: PropTypes.object
}

/*
  NOTES:
    is-active on selected route
*/
const UserDashboard = ({ location, match }) => {
  return (
    <>
      <Breadcrumb />
      <Column.Group>
        <Column size="one-quarter">
          <Menu as={StyledMenu}>
            <Menu.Label>Dashboard</Menu.Label>
            <Menu.List>
              <Menu.List.Item active={true} href={route('callRecords')}>
                Call Records
              </Menu.List.Item>
              <Menu.List.Item href={route('featureQuickSet')}>
                Feature Quick Set
              </Menu.List.Item>
            </Menu.List>
            <Menu.Label>Management</Menu.Label>
            <Menu.List>
              <Menu.List.Item href={route()}>User Profile</Menu.List.Item>
              <Menu.List.Item>Passwords</Menu.List.Item>
              <Menu.List.Item>Announcements</Menu.List.Item>
              <Menu.List.Item>Service Settings</Menu.List.Item>
              <Menu.List.Item>Meet-Me Conferences</Menu.List.Item>
            </Menu.List>
            <Menu.Label>Provisioning</Menu.Label>
            <Menu.List>
              <Menu.List.Item>Addresses</Menu.List.Item>
              <Menu.List.Item>Authorization Codes</Menu.List.Item>
              <Menu.List.Item>Service Assignment</Menu.List.Item>
              <Menu.List.Item>Service Packs</Menu.List.Item>
              <Menu.List.Item>Calling Plans</Menu.List.Item>
              <Menu.List.Item>User ID or Delete</Menu.List.Item>
              <Menu.List.Item>Shared Call Appearance</Menu.List.Item>
              <Menu.List.Item>Viewable Packs</Menu.List.Item>
            </Menu.List>
          </Menu>
        </Column>
        <Column size="three-quarters">
          <Switch>
            <Route
              exact
              path="/users/:serviceProviderId/:groupId/:userId/dashboard"
              render={renderComponent}
            />
            <Route
              exact
              path="/users/:serviceProviderId/:groupId/:userId/dashboard/:component"
              render={renderComponent}
            />
          </Switch>
        </Column>
      </Column.Group>
    </>
  )
}

UserDashboard.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object
}

export default UserDashboard
