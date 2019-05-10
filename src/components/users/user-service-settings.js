import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import uniqBy from 'lodash/uniqBy'
import { UiCancel, UiCard, UiCheckbox, UiDataTable } from '@/components/ui'
import { useModulePermissions, useUserServicePermissions } from '@/utils'
import { AngularComponent } from '@/components/angular-component'
import { userServiceRoutes } from './user-service-routes'
import {
  useAssignedServices,
  useUserAssignedServices
} from '@/store/user-assigned-services'

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

  const showService = service => history.push(`${match.url}/${service.path}`)
  const hideService = () => {
    loadUserAssignedServices(userId)
    history.goBack()
  }

  const services = React.useMemo(() => {
    if (!userViewableServices) return []
    const filtered = userViewableServices.userServices
      .filter(service => userServiceRoutes[service.serviceName])
      .filter(service => hasModuleRead(service.serviceName))
      .map(service => {
        const route = userServiceRoutes[service.serviceName]
        const module = getModule(route.module)
        return { ...module, ...service, path: route.path }
      })
    return uniqBy(filtered, 'name')
  }, [getModule, hasModuleRead, userViewableServices])

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

  const renderRoute = routeProps => {
    const path = routeProps.match.params.path
    const route = Object.values(userServiceRoutes).find(r => r.path === path)
    const { component, angularComponent, ...props } = route
    return angularComponent ? (
      <>
        <UiCancel onClick={hideService} />
        <AngularComponent component={angularComponent} {...props} />
      </>
    ) : (
      <>
        <UiCancel onClick={hideService} />
        <route.component {...props} {...routeProps} />
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
