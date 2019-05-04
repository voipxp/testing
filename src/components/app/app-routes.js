import React from 'react'
import ReactGA from 'react-ga'
import camelCase from 'lodash/camelCase'
import { Switch, Route } from 'react-router-dom'
import { useReduxState } from 'reactive-react-redux'
import { AppDashboard, AppNotFound } from '@/components/app'
import { AngularComponent } from '@/components/angular-component'
import { hasLevel } from '@/utils/acl'

import { angularRoutes, reactRoutes } from './app-routes-routes'

const Analytics = ({ location }) => {
  ReactGA.pageview(location.pathname + location.search)
  return null
}

export const AppRoutes = () => {
  const state = useReduxState()
  const { loginType, isPaasAdmin } = state.session
  const { modules } = state.ui

  const getModule = name => {
    const module = modules[name]
    return module
      ? { ...module, permissions: module.permissions[camelCase(loginType)] }
      : null
  }

  const notFoundRoute = path => (
    <Route exact key={path} path={path} component={AppNotFound} />
  )

  const generateRoute = route => {
    const module = getModule(route.module)
    if (module && !module.permissions.read) {
      return notFoundRoute(route.path)
    }
    if (route.acl && !hasLevel(loginType, route.acl, isPaasAdmin)) {
      return notFoundRoute(route.path)
    }
    const { path, component, Component, ...rest } = route
    return component ? (
      <Route
        exact
        key={path}
        path={path}
        render={() => (
          <AngularComponent component={component} module={module} {...rest} />
        )}
      />
    ) : (
      <Route
        key={path}
        path={path}
        render={props => <Component module={module} {...rest} {...props} />}
      />
    )
  }

  return (
    <>
      <Switch>
        <Route path="/" exact component={AppDashboard} />
        {angularRoutes.map(route => generateRoute(route))}
        {reactRoutes.map(route => generateRoute(route))}
        <Route component={AppNotFound} />
      </Switch>
      <Route component={Analytics} />
    </>
  )
}
