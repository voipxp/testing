import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {
  AppAnalytics,
  AppDashboard,
  AppNotFound,
  AppTimer
} from '@/components/app'
import { AngularComponent } from '@/components/angular-component'
import { useAcl, useModulePermissions } from '@/utils'
import { routes } from './routes'

export const AppRoutes = () => {
  const { hasLevel, hasVersion, isPaasAdmin } = useAcl()
  const { getModule, hasModuleRead } = useModulePermissions()

  const notFoundRoute = path => (
    <Route exact key={path} path={path} component={AppNotFound} />
  )

  const generateRoute = route => {
    if (route.hasVersion && !hasVersion(route.hasVersion)) {
      return notFoundRoute(route.path)
    }
    if (route.hasLevel && !hasLevel(route.hasLevel)) {
      return notFoundRoute(route.path)
    }
    if (route.isPaasAdmin && !isPaasAdmin()) {
      return notFoundRoute(route.path)
    }
    const module = getModule(route.hasModuleRead)
    if (module && !hasModuleRead(route.hasModuleRead)) {
      return notFoundRoute(route.path)
    }
    const { path, component, angularComponent, exact, ...rest } = route
    return angularComponent ? (
      <Route
        exact
        key={path}
        path={path}
        render={() => (
          <AngularComponent
            {...rest}
            component={angularComponent}
            module={module}
          />
        )}
      />
    ) : (
      <Route
        key={path}
        path={path}
        exact={exact}
        render={props => (
          <route.component {...rest} {...props} module={module} />
        )}
      />
    )
  }

  return (
    <>
      <Switch>
        <Route path="/" exact component={AppDashboard} />
        {routes.map(route => generateRoute(route))}
        <Route component={AppNotFound} />
      </Switch>
      <Route component={AppAnalytics} />
      <Route component={AppTimer} />
    </>
  )
}
