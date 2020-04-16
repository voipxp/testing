import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import uniqBy from 'lodash/uniqBy'
import { UiClose, UiCard, UiDataTable } from '@/components/ui'
import { useModulePermissions, useUserServicePermissions } from '@/utils'
import { useUserAssignedServices } from '@/store/user-assigned-services'
import { AngularComponent } from '@/components/angular-component'
import { groupUserServiceRoutes } from './group-user-service-routes'
/* eslint-disable react/display-name */
const columns = [
  {
    key: 'alias',
    label: 'Name'
  },
  {
    key: 'description',
    label: 'Description'
  }
]

export const GroupUserServiceSettings = ({ history, match }) => {
  const { serviceProviderId,groupId } = match.params
  const { getModule } = useModulePermissions()
  //const { userViewableServices } = useUserServicePermissions(serviceProviderId,groupId)
  const { loadUserAssignedServices } = useUserAssignedServices(serviceProviderId,groupId)

  const showService = service => {
    history.push(`${match.url}/${service.path}`)
  }

  const hideService = () => {
    loadUserAssignedServices(serviceProviderId,groupId)
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
   // if (!userViewableServices) return []
    // turn this into a map of serviceName => route
    const allowedServices = groupUserServiceRoutes.reduce((obj, route) => {
      route.services.forEach(s => (obj[s] = route))
      return obj
    }, {})
    // filter out ones not in our map or missing read perms
    const filtered = groupUserServiceRoutes.map(service => {
        const route = allowedServices[service.name]
        const module = getModule(service.hasModuleRead)
        return { ...module, ...service, path: route.path }
      })
    // remove dups such as Shared Call Appearance
    return uniqBy(filtered, 'name')
  }, [getModule])

  // The base view when no sub-component picked
  const UserServiceList = () => (
    <UiCard title="User Services">
      <UiDataTable
        columns={columns}
        rows={services}
        rowKey="services"
        onClick={service => showService(service)}
      />
    </UiCard>
  )

  // render the clicked service
  const renderRoute = routeProps => {
    const path = routeProps.match.params.path
    const route = Object.values(groupUserServiceRoutes).find(r => r.path === path)
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

GroupUserServiceSettings.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
}
