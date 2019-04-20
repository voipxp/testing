import React from 'react'
import ReactGA from 'react-ga'
import { Switch, Route } from 'react-router-dom'
import { camelCase } from 'lodash'
import { useReduxState } from 'reactive-react-redux'
import Dashboard from './dashboard'
import AngularComponent from './angular-component'
import NotFound from './notfound'
import { hasLevel } from '@/store/session'

// angular routes
import appRoutes from '@/angular/app/routes'
import brandingRoutes from '@/angular/branding/routes'
import bulkRoutes from '@/angular/bulk/routes'
import eventsRoutes from '@/angular/events/routes'
import groupRoutes from '@/angular/group/routes'
import serviceProviderRoutes from '@/angular/service-provider/routes'
import settingsRoutes from '@/angular/settings/routes'
import systemRoutes from '@/angular/system/routes'
import userRoutes from '@/angular/user/routes'
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
  ...userRoutes,
  ...vdmRoutes
]

const Analytics = ({ location }) => {
  ReactGA.pageview(location.pathname + location.search)
  return null
}

const Router = () => {
  const state = useReduxState()
  const { loginType } = state.session
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
        <Route exact key={route.path} path={route.path} component={NotFound} />
      )
    }
    if (route.acl && !hasLevel(loginType, route.acl)) {
      return (
        <Route exact key={route.path} path={route.path} component={NotFound} />
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
        <Route path="/" exact component={Dashboard} />
        {angularRoutes.map(route => generateRoute(route))}
        <Route component={NotFound} />
      </Switch>
      <Route component={Analytics} />
    </>
  )
}

export default Router
