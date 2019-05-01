import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Column, Message } from 'rbx'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import AngularComponent from './angular-component'
import Breadcrumb from './breadcrumb'
import components from './user-dashboard-components'
import { useAcl } from '@/utils/acl'

const StyledMenu = styled.div`
  background-color: white;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  padding: 1rem;
`

const renderDefault = () => {
  return <NotFound />
}

const NotFound = () => (
  <Message color="dark">
    <Message.Body>
      We are sorry, but the page you requested was not found.
    </Message.Body>
  </Message>
)

const renderComponent = ({ match }) => {
  const { path } = match.params
  const label = Object.keys(components).find(l => components[l][path])
  if (!label) return <NotFound />
  const component = components[label][path]
  if (component.angularComponent) {
    const props = { ...component.bindings }
    return (
      <AngularComponent component={component.angularComponent} {...props} />
    )
  } else {
    const Component = component.component
    return <Component />
  }
}
renderComponent.propTypes = {
  match: PropTypes.object
}

const UserDashboard = ({ match, location }) => {
  const { hasVersion, hasLevel } = useAcl()

  const renderItem = (label, path) => {
    const component = components[label][path]

    // check permissions
    if (component.version && !hasVersion(component.version)) return null
    if (component.acl && !hasLevel(component.acl)) return null

    const componentPath = `${match.url}/${path}`
    return (
      <Menu.List.Item
        key={path}
        active={location.pathname === componentPath}
        href={`#!${componentPath}`}
      >
        {component.name}
      </Menu.List.Item>
    )
  }
  const renderSection = label => {
    return (
      <React.Fragment key={label}>
        <Menu.Label>{label}</Menu.Label>
        <Menu.List>
          {Object.keys(components[label]).map(path => renderItem(label, path))}
        </Menu.List>
      </React.Fragment>
    )
  }

  return (
    <>
      <Breadcrumb />
      <Column.Group>
        <Column size="one-quarter">
          <Menu as={StyledMenu}>
            {Object.keys(components).map(label => renderSection(label))}
          </Menu>
        </Column>
        <Column size="three-quarters">
          <Switch>
            <Route
              exact
              path={`${match.path}/:path`}
              render={renderComponent}
            />
            <Route render={renderDefault} />
          </Switch>
        </Column>
      </Column.Group>
    </>
  )
}

UserDashboard.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object
}

export default UserDashboard
