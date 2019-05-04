import React from 'react'
import ReactGA from 'react-ga'
import { Switch, Route } from 'react-router-dom'
import { AppDashboard, AppNotFound } from '@/components/app'
import { AngularComponent } from '@/components/angular-component'
import { useAcl, useModulePermissions } from '@/utils'
import { angularRoutes, reactRoutes } from './app-routes-routes'

const Analytics = ({ location }) => {
  ReactGA.pageview(location.pathname + location.search)
  return null
}

export const AppRoutes = () => {
  const { hasLevel, hasVersion } = useAcl()
  const { getModule } = useModulePermissions()

  const notFoundRoute = path => (
    <Route exact key={path} path={path} component={AppNotFound} />
  )

  const generateRoute = route => {
    if (route.version && !hasVersion(route.version)) {
      return notFoundRoute(route.path)
    }
    if (route.acl && !hasLevel(route.acl)) {
      return notFoundRoute(route.path)
    }
    const module = getModule(route.module)
    if (module && !module.permissions.read) {
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
