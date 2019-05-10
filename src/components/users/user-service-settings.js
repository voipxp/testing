import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import uniqBy from 'lodash/uniqBy'
import { UiClose, UiCard, UiCheckbox, UiDataTable } from '@/components/ui'
import { useModulePermissions, useUserServicePermissions } from '@/utils'
import { useUserAssignedServices } from '@/store/user-assigned-services'
import { AngularComponent } from '@/components/angular-component'
import { userServiceRoutes } from './user-service-routes'

/* eslint-disable react/display-name */
const columns = [
  {
    key: 'alias',
    label: 'Name'
  },
  {
    key: 'description',
    label: 'Description'
  },
  {
    key: 'isActive',
    label: 'Active',
    render: row => <UiCheckbox isChecked={row.isActive} />
  }
]

export const UserServiceSettings = ({ history, match }) => {
  const { userId } = match.params
  const { getModule, hasModuleRead } = useModulePermissions()
  const { userViewableServices } = useUserServicePermissions(userId)
  const { loadUserAssignedServices } = useUserAssignedServices(userId)

  const showService = service => {
    history.push(`${match.url}/${service.path}`)
  }

  const hideService = () => {
    loadUserAssignedServices(userId)
    history.goBack()
  }

  /*
  turn our array of routes into a filtered list of components,
  pulling in module aliases and description, maintaining the route path
  [{
    name: 'Service':
    alias: 'Something',
    description: 'Something Cool',
    isActive: true,
    path: 'some-service'
  }]
  */
  const services = React.useMemo(() => {
    if (!userViewableServices) return []
    // turn this into a map of serviceName => route
    const allowedServices = userServiceRoutes.reduce((obj, route) => {
      route.services.forEach(s => (obj[s] = route))
      return obj
    }, {})
    // filter out ones not in our map or missing read perms
    const filtered = userViewableServices.userServices
      .filter(service => {
        const route = allowedServices[service.serviceName]
        return route && route.module && hasModuleRead(route.module)
      })
      // merge the module and the service
      .map(service => {
        const route = allowedServices[service.serviceName]
        const module = getModule(route.module)
        return { ...module, ...service, path: route.path }
      })
    // remove dups such as Shared Call Appearance
    return uniqBy(filtered, 'name')
  }, [getModule, hasModuleRead, userViewableServices])

  // The base view when no sub-component picked
  const UserServiceList = () => (
    <UiCard title="Configure Services">
      <UiDataTable
        columns={columns}
        rows={services}
        rowKey="serviceName"
        onClick={service => showService(service)}
      />
    </UiCard>
  )

  // render the clicked service
  const renderRoute = routeProps => {
    const path = routeProps.match.params.path
    const route = Object.values(userServiceRoutes).find(r => r.path === path)
    const { component, angularComponent, ...props } = route
    return (
      <>
        <UiClose onClick={hideService} />
        {angularComponent ? (
          <AngularComponent component={angularComponent} {...props} />
        ) : (
          <route.component {...props} {...routeProps} />
        )}
      </>
    )
  }

  return (
    <Switch>
      <Route path={`${match.path}/:path`} exact render={renderRoute} />
      <Route render={UserServiceList} />
    </Switch>
  )
}

UserServiceSettings.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
}
