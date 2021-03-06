import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import uniqBy from 'lodash/uniqBy'
import { UiClose, UiCard, UiDataTable, UiLoadingCard } from '@/components/ui'
import { AngularComponent } from '@/components/angular-component'
import { groupUserServiceRoutes } from './group-user-service-routes'
import api from '@/api/group-services'
import { useQuery } from 'react-query'
import { useModulePermissions } from '@/utils'

/* eslint-disable react/display-name */
const columns = [
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'description',
    label: 'Description'
  }
]

export const GroupUserServiceSettings = ({ history, match }) => {
  const { serviceProviderId, groupId } = match.params
  const { getModule, hasModuleRead } = useModulePermissions()
  const { data: result, isLoading } = useQuery(
    'groups-available-services',
    () => api.available(groupId, serviceProviderId)
  )

  const hasAvailableGroupService = result || []
  const showService = service => {
    history.push(`${match.url}/${service.path}`)
  }

  const hideService = () => {
    history.push(`/groups/${serviceProviderId}/${groupId}/user-services`)
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
    const allowedServices = groupUserServiceRoutes.reduce((obj, route) => {
      route.hasGroupService.forEach(s => (obj[s] = route))
      return obj
    }, {})

    const filtered = hasAvailableGroupService
      .filter(service => {
        const route = allowedServices[service]
        return (
          route && route.hasModuleRead && hasModuleRead(route.hasModuleRead)
        )
      })
      .map(service => {
        const route = allowedServices[service]
        const module = getModule(route.hasModuleRead)
        return { ...module, ...service, path: route.path }
      })
    // remove dups such as Shared Call Appearance
    return uniqBy(filtered, 'name')
  }, [getModule, hasModuleRead, hasAvailableGroupService])
  // The base view when no sub-component picked

  /* changes service name/description for Flexible Seating Guest to Flexible Seating Hosts */
  const GroupServiceList = () => {
    return isLoading ? (
      <UiLoadingCard />
    ) : (
      <UiCard title="User Bulk Services">
        <UiDataTable
          columns={columns}
          rows={services}
          rowKey="name"
          pageSize={25}
          onClick={service => showService(service)}
        />
      </UiCard>
    )
  }
  // render the clicked service
  const renderRoute = routeProps => {
    const path = routeProps.match.params.path
    const route = Object.values(groupUserServiceRoutes).find(
      r => r.path === path
    )
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
      <Route render={GroupServiceList} />
    </Switch>
  )
}

GroupUserServiceSettings.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
}
