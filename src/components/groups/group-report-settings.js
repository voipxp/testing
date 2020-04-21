import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import uniqBy from 'lodash/uniqBy'
import { UiClose, UiCard, UiDataTable } from '@/components/ui'
import { useModulePermissions, useUserServicePermissions } from '@/utils'
import { AngularComponent } from '@/components/angular-component' 
import { groupReportRoutes } from './group-report-routes'

/* eslint-disable react/display-name */
const columns = [
  {
    key: 'name',
    label: 'Name'
  }
]

export const GroupReportSettings = ({ history, match }) => {
  const { getModule } = useModulePermissions()
  const {serviceProviderId , groupId } =  match.params
  const showService = service => {
    history.push(`${match.url}/${service.path}`)
  }

  const hideService = () => {
	history.push(`/groups/${serviceProviderId}/${groupId}/reports`)
   // history.goBack()
  }
   
  const services = React.useMemo(() => {
    const allowedServices = groupReportRoutes.reduce((obj, route) => {
      groupReportRoutes.forEach(s => (obj[s] = route))
      return obj
    }, {})
    // filter out ones not in our map or missing read perms
    const filtered = groupReportRoutes.map(service => {  
        const route = allowedServices[service.hasModuleRead]
        const module = getModule(route)
        return { ...module, ...service, path: service.path }
      })
    // remove dups such as Shared Call Appearance
    return uniqBy(filtered, 'name')
  }, [getModule])

  // The base view when no sub-component picked
  const GroupServiceList = () => (
    <UiCard title="Reports">
      <UiDataTable
        columns={columns}
        rows={services}
        rowKey="name"
        onClick={service => showService(service)}
      />
    </UiCard>
  )

  // render the clicked service
  const renderRoute = routeProps => {
    const path = routeProps.match.params.path
    const route = Object.values(groupReportRoutes).find(r => r.path === path)
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

GroupReportSettings.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
}
