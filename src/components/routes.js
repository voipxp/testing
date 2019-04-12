/*
  TODO
  - grab all the props of all the routes to see what we are dealing with
  - change the bulk data resolve
    - use redux instead for storage
    - render the select users if none are selected
    - otherwise render the actual page
    - eliminate the redirect
  - handle sso in the login component
*/

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Angular from './angular'

// angular routes
import appRoutes from '/angular/app/routes'
import brandingRoutes from '/angular/branding/routes'
import bulkRoutes from '/angular/bulk/routes'
import eventsRoutes from '/angular/events/routes'
import groupRoutes from '/angular/group/routes'
import serviceProviderRoutes from '/angular/service-provider/routes'
import settingsRoutes from '/angular/settings/routes'
import systemRoutes from '/angular/system/routes'
import userRoutes from '/angular/user/routes'
import vdmRoutes from '/angular/vdm/routes'

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

/*
  Route Attributes:
  [
    "path",
    "component",
    "acl",
    "module",
    "bindings"
  ]"
*/

const Router = () => {
  return (
    <Switch>
      {angularRoutes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          render={() => (
            <Angular
              component={route.component}
              acl={route.acl}
              {...route.bindings}
            />
          )}
        />
      ))}
    </Switch>
  )
}

export default Router
