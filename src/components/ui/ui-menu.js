import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Menu, Column } from 'rbx'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { UiLoading } from '@/components/ui'
import { AngularComponent } from '@/components/angular-component'

const StyledMenu = styled.div`
  background-color: white;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  padding: 1rem;
`

const UiMenuBase = ({ match, location, menu = [] }) => {
  const renderRoute = routeProps => {
    const path = routeProps.match.params.path
    let route
    for (const section of menu) {
      route = section.items.find(item => item.path === path)
      if (route) break
    }
    if (!route) return renderDefault()
    const { component, angularComponent, ...props } = route
    if (angularComponent) {
      return <AngularComponent component={angularComponent} {...props} />
    } else {
      return <route.component {...props} {...routeProps} />
    }
  }

  const isActive = item => {
    const path = `${match.url}/${item.path}`
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    )
  }

  // select the first route from the first section
  const renderDefault = () => {
    const section = menu[0]
    const route = section && section.items[0]
    return route ? (
      <Redirect to={`${match.url}/${route.path}`} />
    ) : (
      <UiLoading />
    )
  }

  return (
    <>
      <Column.Group>
        <Column narrow>
          <Menu as={StyledMenu}>
            {menu.map(section => (
              <React.Fragment key={section.label}>
                <Menu.Label>{section.label}</Menu.Label>
                <Menu.List>
                  {section.items.map(item => {
                    const path = `${match.url}/${item.path}`
                    return (
                      <Menu.List.Item
                        key={item.path}
                        active={isActive(item)}
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
        <Column style={{ overflow: 'auto' }}>
          <Switch>
            <Route path={`${match.path}/:path`} render={renderRoute} />
            <Route render={renderDefault} />
          </Switch>
        </Column>
      </Column.Group>
    </>
  )
}

UiMenuBase.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
          component: PropTypes.any,
          angularComponent: PropTypes.string
        })
      )
    })
  ).isRequired
}

export const UiMenu = withRouter(UiMenuBase)
