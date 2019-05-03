import React from 'react'
import ReactGA from 'react-ga'
import camelCase from 'lodash/camelCase'
import { Switch, Route } from 'react-router-dom'
import { useReduxState } from 'reactive-react-redux'
import { AppDashboard, AppNotFound } from '@/components/app'
import { UserDashboard } from '@/components/user-dashboard'
import { AngularComponent } from '@/components/angular-component'
import { hasLevel } from '@/utils/acl'

// angular routes
import appRoutes from '@/angular/app/routes'
import brandingRoutes from '@/angular/branding/routes'
import bulkRoutes from '@/angular/bulk/routes'
import eventsRoutes from '@/angular/events/routes'
import groupRoutes from '@/angular/group/routes'
import serviceProviderRoutes from '@/angular/service-provider/routes'
import settingsRoutes from '@/angular/settings/routes'
import systemRoutes from '@/angular/system/routes'
import vdmRoutes from '@/angular/vdm/routes'

const angularRoutes = [
  ...appRoutes,
  ...brandingRoutes,
  ...bulkRoutes,
  ...eventsRoutes,
  ...groupRoutes,
  ...serviceProviderRoutes,
  ...settingsRoutes,
  ...systemRoutes,
  ...vdmRoutes
]

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

  const generateRoute = route => {
    const module = getModule(route.module)
    if (module && !module.permissions.read) {
      return (
        <Route
          exact
          key={route.path}
          path={route.path}
          component={AppNotFound}
        />
      )
    }
    if (route.acl && !hasLevel(loginType, route.acl, isPaasAdmin)) {
      return (
        <Route
          exact
          key={route.path}
          path={route.path}
          component={AppNotFound}
        />
      )
    }
    return (
      <Route
        key={route.path}
        path={route.path}
        exact
        render={() => (
          <AngularComponent
            component={route.component}
            acl={route.acl}
            module={module}
            {...route.bindings}
          />
        )}
      />
    )
  }

  return (
    <>
      <Switch>
        <Route path="/" exact component={AppDashboard} />
        {angularRoutes.map(route => generateRoute(route))}
        <Route
          path="/users/:serviceProviderId/:groupId/:userId"
          component={UserDashboard}
        />
        <Route component={AppNotFound} />
      </Switch>
      <Route component={Analytics} />
    </>
  )
}
