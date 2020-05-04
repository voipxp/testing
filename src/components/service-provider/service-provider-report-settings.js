import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import uniqBy from 'lodash/uniqBy'
import { UiClose, UiCard, UiDataTable } from '@/components/ui'
import { useModulePermissions , useAcl } from '@/utils'
import { AngularComponent } from '@/components/angular-component' 
import { ReportRoutes } from './service-provider-report-routes'

/* eslint-disable react/display-name */
const columns = [
  {
    key: 'name',
    label: 'Name'
  }
]

export const ReportRouteSettings = ({ history, match }) => {
  const { getModule , hasModuleRead } = useModulePermissions()
  const { hasVersion, hasLevel, isLevel, isPaasAdmin } = useAcl()
  const showService = service => {
    history.push(`${match.url}/${service.path}`)
  }

  const hideService = () => {
    history.goBack()
  }
   
  const services = React.useMemo(() => {
    const allowedServices = ReportRoutes.reduce((obj, route) => {
      ReportRoutes.forEach(s => (obj[s] = route))
      return obj
    }, {})
    // filter out ones not in our map or missing read perms
    const filtered = ReportRoutes.map(service => {  
      if (service.hasVersion && !hasVersion(service.hasVersion)) {
        return false
      }
      if (service.hasLevel && !hasLevel(service.hasLevel)) {
        return false
      }
      if (service.isLevel && !isLevel(service.isLevel)) {
        return false
      }
      if (service.isPaasAdmin && !isPaasAdmin()) {
        return false
      }
      if (service.hasModuleRead && !hasModuleRead(service.hasModuleRead)) {
        return false
      }
      const route = allowedServices[service.hasModuleRead]
      const module = getModule(route)
      return { ...module, ...service, path: service.path }
    })
    // remove dups such as Shared Call Appearance
    return uniqBy(filtered, 'name')
  }, [getModule, hasLevel, hasModuleRead, hasVersion, isLevel, isPaasAdmin ])

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
    const route = Object.values(ReportRoutes).find(r => r.path === path)
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

ReportRouteSettings.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
}
