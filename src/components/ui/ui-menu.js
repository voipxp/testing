import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Menu, Column } from 'rbx'
import _ from 'lodash'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { UiLoading } from '@/components/ui'
import { AngularComponent } from '@/components/angular-component'
import { Icon } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons'
const StyledMenu = styled.div`
  background-color: white;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  padding: 1rem;
`

/**
 *
 * Renders a side-menu based on a map of routes. You must pass in the **menu** prop which contains an array of sections and menu items and their corresponding routes.
 *
 * The Menu sections and items within each section will be in the same order that is passed in via the menu prop. Any props passed to the item objects will be passed through to the component.
 *
 * UiMenu relies on react-router for navigation and must be within a Router context.
 */
export const UiMenuBase = ({ match, location, menu = [] }) => {
  const [activeSubMenu, setActiveSubMenu] = React.useState({})
  const [currentRout, setCurrentRout] = React.useState()

  const renderRoute = routeProps => {
    const path = routeProps.match.params.path
    let route
    for (const section of menu) {
      if( _.size(activeSubMenu) && section.items[activeSubMenu.index]) {
        route = section.items[activeSubMenu.index].subMenus.find(el => el.path === path)
      }
      else route = section.items.find(item => item.path === path)
      if (route) break
    }
    if(!route) route = currentRout
    setCurrentRout(route)
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
    let route = ''
    if(section && section.items[0].subMenus) {
      setActiveSubMenu({index: 0})
      route = section.items[0].subMenus[0]
    }
    else route = section && section.items[0]
    return route ? (
      <Redirect to={`${match.url}/${route.path}`} />
    ) : (
      <UiLoading />
    )
  }

  const isActiveSubMenu = clickedIndex => clickedIndex === activeSubMenu.index

  const drawSubMenu = (item, index) => {
    return <>
        <Menu.List key={index}>
        {isActiveSubMenu(index) && item.subMenus.map(subMenu => {
          const subMenuPath = `${match.url}/${subMenu.path}`
          return (
            <Menu.List.Item
              key={subMenu.path}
              active={isActive(subMenu)}
              href={`#!${subMenuPath}`}
            >
              {subMenu.name}
            </Menu.List.Item>
          )
        })
        }
        </Menu.List>
      </>
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
                  {section.items.map( (item, index) => {
                    const path = `${match.url}/${item.path}`
                    return (
                      <>
                        {
                          item.subMenus   /* If item has submenu */
                          ?
                          <Menu.List.Item
                            key={item.path}
                            onClick={() => setActiveSubMenu({index: activeSubMenu.index === index ? null : index})}
                            menu={
                              drawSubMenu(item, index)
                            }
                          >
                            {item.name}
                            <Icon style={{float: 'right'}}>
                              <FontAwesomeIcon icon={isActiveSubMenu(index) ? faChevronUp : faChevronDown} />
                            </Icon>
                          </Menu.List.Item>
                          :
                          <Menu.List.Item
                            key={item.path}
                            active={isActive(item)}
                            href={`#!${path}`}
                          >
                            {item.name}
                        </Menu.List.Item>
                        }
                      </>
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
  /** Array of Routes and Components to Render */
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          path: PropTypes.string,
          component: PropTypes.any,
          angularComponent: PropTypes.string,
          subMenus: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired,
              path: PropTypes.string.isRequired,
              component: PropTypes.any,
              angularComponent: PropTypes.string,
            })
          )
        })
      )
    })
  ).isRequired
}

export const UiMenu = withRouter(UiMenuBase)
