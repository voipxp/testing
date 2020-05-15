import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Menu, Column, Icon } from 'rbx'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { UiLoading } from '@/components/ui'
import { AngularComponent } from '@/components/angular-component'
import { useUiTemplate } from '@/store/ui-template'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell,
  faBullseye,
  faChartBar,
  faChartPie,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faClone,
  faCog,
  faCogs,
  faDownload,
  faExternalLinkAlt,
  faInfo,
  faLink,
  faList,
  faLock,
  faPlus,
  faSearch,
  faSitemap,
  faSync,
  faTag,
  faTimes,
  faThList,
  faTrash,
  faPoo,
  faUpload,
  faUserPlus,
  faUsers,
  faWrench,
  faVolumeUp,
  faKey,
  faHandshake,
  faUserCog,
  faUserClock,
  faIdCard,
  faIdBadge,
  faPhone
} from '@fortawesome/free-solid-svg-icons'
const icons = {
  add: faPlus,
  bell: faBell,
  bulk: faSitemap,
  cancel: faTimes,
  check: faCheck,
  clone: faClone,
  cogs: faCogs,
  cog: faCog,
  delete: faTrash,
  device: faWrench,
  download: faDownload,
  edit: faCog,
  info: faInfo,
  left: faChevronLeft,
  link: faLink,
  list: faList,
  lock: faLock,
  open: faExternalLinkAlt,
  right: faChevronRight,
  poo: faPoo,
  search: faSearch,
  select: faUserPlus,
  sync: faSync,
  tag: faTag,
  target: faBullseye,
  upload: faUpload,
  users: faUsers,
  audio: faVolumeUp,
  password: faKey,
  handshake: faHandshake,
  usercog: faUserCog,
  userclock: faUserClock,
  idcard: faIdCard,
  idbadge: faIdBadge,
  phone: faPhone,
  chartPie: faChartPie,
  chartBar: faChartBar,
  thList: faThList
}

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
  const { template } = useUiTemplate()
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

  // set route based on branding template User Landing Page
  // if not set in branding template, feature-quick-set be used
  // if branding template not set and user doens't have feature-quick-set, his first menu item will be used
  const renderDefault = () => {
    const defaultUserLandingPage = 'feature-quick-set'
    let userLandingPage = ''
    let pageToCheck = ''
    let pageFound = false
    let featureQuickSetFound = false
    let atLeastOneLandingPage = false
    const section = menu[0]
    pageToCheck = defaultUserLandingPage
    if (template.userLandingPage) {
      pageToCheck = template.userLandingPage
    }
    // Loop through all the menu items that user is able to see
    section.items.forEach(function (availableUserLandingPage, index) {
      atLeastOneLandingPage = true
      if (availableUserLandingPage.path == pageToCheck) {
        userLandingPage = availableUserLandingPage.path
        pageFound = true
      }
      if (availableUserLandingPage == defaultUserLandingPage) {
        featureQuickSetFound = true
      }
    });
    if (!pageFound && !featureQuickSetFound) {
      if ( atLeastOneLandingPage) {
        userLandingPage = section.items[0]['path']
      } else {
        userLandingPage = 'user-profile'
      }
    }
    return userLandingPage ? (
      <Redirect to={`${match.url}/${userLandingPage}`} />
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
                        <>
                          {item.icon && (
                            <Icon align="left" style={{ marginRight: '4px' }}>
                              <FontAwesomeIcon icon={icons[item.icon]} />
                            </Icon>
                          )}
                        </>
                        <span align="right">{item.name}</span>
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
  /** Array of Routes and Components to Render */
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
