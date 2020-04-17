import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import uniqBy from 'lodash/uniqBy'
import { UiClose, UiCard, UiDataTable , UiLoading} from '@/components/ui' 
import { useGroupServices } from '@/store/group-services'
//import { useUserAssignedServices } from '@/store/user-assigned-services'
import { AngularComponent } from '@/components/angular-component'
import { groupServiceRoutes } from './group-service-routes'
import {
	useGroupServicePermissions,
  useAcl,
  useModulePermissions
} from '@/utils'

/* eslint-disable react/display-name */
const columns = [
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'alias',
    label: 'Description'
  }
]

export const GroupServiceSettings = ({ history, match }) => {
  const { serviceProviderId,groupId } = match.params
  const [loading, setLoading] = React.useState(false)
  const { getModule } = useModulePermissions()
  const { hasGroupService } = useGroupServicePermissions()
  const {  hasLevel } = useAcl()
  //const { userViewableServices } = useUserServicePermissions(serviceProviderId,groupId)
  const { loadGroupServices } = useGroupServices(groupId, serviceProviderId)
 
  React.useEffect(() => {
    setLoading(true)
    Promise.all([
      loadGroupServices(groupId, serviceProviderId),
    ]).then(() => 	setLoading(false) )
  }, [serviceProviderId, groupId, loadGroupServices])

  const showService = service => {
   history.push(`${match.url}/${service.path}`)
  }

  const hideService = () => { 
    history.push(`/groups/${serviceProviderId}/${groupId}/group-service`)
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
    if (!hasGroupService) return []
    // filter out ones not in our map or missing read perms
      const filtered = groupServiceRoutes.map(service => {
       //const route = allowedServices[service.name]
       if (service.hasLevel && !hasLevel(service.hasLevel)) {
        return false
      }
        if (service.hasGroupService && !hasGroupService(service.hasGroupService)) {
          return false
        }
        const module = getModule(service.hasModuleRead)
          return { ...module, ...service, path: service.path }
      })
    // remove dups such as Shared Call Appearance
    if(filtered.length > 1)  return uniqBy(filtered, 'name')
    
  }, [getModule, hasGroupService , hasLevel])

  // The base view when no sub-component picked
  const GroupServiceList = () => {
    return loading ? (
      <UiLoading />
    ) : (
        <UiCard title="Group Services">
          <UiDataTable
            columns={columns}
            rows={services.length > 1 && services || []}
            rowKey="name"
            pageSize={10}
            onClick={service => showService(service)}
          />
        </UiCard>
      )
  }
  // render the clicked service
  const renderRoute = routeProps => {
    const path = routeProps.match.params.path
    const route = Object.values(groupServiceRoutes).find(r => r.path === path)
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

GroupServiceSettings.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
}
