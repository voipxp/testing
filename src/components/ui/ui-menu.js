import React, { useEffect, useState } from 'react'
import uniq from 'lodash/uniq'
import sortBy from 'lodash/sortBy'
import PropTypes from 'prop-types'
import { Menu, Column, Message } from 'rbx'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import AngularComponent from '../angular-component'
import { UiSpinner } from '@/components/ui'
import { useAcl } from '@/utils/acl'

const StyledMenu = styled.div`
  background-color: white;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  padding: 1rem;
`

const NotFound = () => (
  <Message color="dark">
    <Message.Body>
      We are sorry, but the page you requested was not found.
    </Message.Body>
  </Message>
)

const UiMenu = ({ match, location, routes = [] }) => {
  const { hasVersion, hasLevel } = useAcl()
  const [menuRoutes, setMenuRoutes] = useState([])
  const [menuSections, setMenuSections] = useState([])
  const [menuItems, setMenuItems] = useState([])

  // filter out routes based on permissions of the user
  useEffect(() => {
    const items = routes.filter(route => {
      if (route.version && !hasVersion(route.version)) return false
      if (route.acl && !hasLevel(route.acl)) return false
      return true
    })
    setMenuRoutes(items)
  }, [hasLevel, hasVersion, routes])

  // order the sections by name
  useEffect(() => {
    const sortedSections = uniq(menuRoutes.map(i => i.section)).sort()
    setMenuSections(sortedSections)
  }, [menuRoutes])

  // create a map of routes to sections
  useEffect(() => {
    const mappedRoutes = sortBy(menuRoutes, 'name').reduce((obj, item) => {
      obj[item.section] = obj[item.section] || []
      obj[item.section].push(item)
      return obj
    }, {})
    setMenuItems(mappedRoutes)
  }, [menuRoutes])

  const renderRoute = path => {
    const route = menuRoutes.find(route => route.path === path)
    if (!route) return <NotFound />
    if (route.angularComponent) {
      const props = { ...route.bindings }
      return <AngularComponent component={route.angularComponent} {...props} />
    } else {
      const Component = route.component
      return <Component />
    }
  }

  // select the first route from the first section
  const renderDefault = () => {
    const section = menuSections[0]
    const route = section && menuItems[section][0]
    return route ? (
      <Redirect to={`${match.url}/${route.path}`} />
    ) : (
      <UiSpinner />
    )
  }

  return (
    <>
      <Column.Group>
        <Column size="one-quarter">
          <Menu as={StyledMenu}>
            {menuSections.map(section => (
              <React.Fragment key={section}>
                <Menu.Label>{section}</Menu.Label>
                <Menu.List>
                  {menuItems[section].map(item => {
                    const path = `${match.url}/${item.path}`
                    return (
                      <Menu.List.Item
                        key={item.path}
                        active={location.pathname === path}
                        href={`#!${path}`}
                      >
                        {item.name}
                      </Menu.List.Item>
                    )
                  })}
                </Menu.List>
              </React.Fragment>
            ))}
          </Menu>
        </Column>
        <Column size="three-quarters">
          <Switch>
            <Route
              exact
              path={`${match.path}/:path`}
              render={({ match }) => renderRoute(match.params.path)}
            />
            <Route render={renderDefault} />
          </Switch>
        </Column>
      </Column.Group>
    </>
  )
}

UiMenu.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired
}

export default withRouter(UiMenu)
