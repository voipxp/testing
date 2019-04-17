import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { camelCase } from 'lodash'
import { connect } from 'react-redux'
import Dashboard from './dashboard'
import Angular from './angular'
import NotFound from './notfound'
import { hasLevel } from '/store/session'

import TestBed from './testbed'

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

const Router = ({ loginType, modules }) => {
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
          <Angular
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
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/testbed" exact component={TestBed} />
      {angularRoutes.map(route => generateRoute(route))}
      <Route component={NotFound} />
    </Switch>
  )
}

Router.propTypes = {
  loginType: PropTypes.string,
  modules: PropTypes.object
}

const mapState = state => ({
  loginType: state.session.loginType,
  modules: state.ui.modules
})

export default connect(mapState)(Router)
