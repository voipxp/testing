import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import uniqBy from 'lodash/uniqBy'
import { UiClose, UiCard, UiDataTable } from '@/components/ui'
import { useModulePermissions } from '@/utils'
import { AngularComponent } from '@/components/angular-component' 
import { ProvisioningRoutes } from './system-provisioning-routes'

/* eslint-disable react/display-name */
const columns = [
  {
    key: 'name',
    label: 'Name'
  }
]

export const ProvisioningRouteSettings  = ({ history, match }) => {
  const { getModule } = useModulePermissions()
  const {serviceProviderId , featurePath} = match.params
  const showService = service => { 
  if(service.path ==='audits' || service.path ==='exports' || service.path ==='imports' ) history.push(`/${service.path}`)
  else history.push(`${match.url}/${service.path}`)
     
  }

  const hideService = () => {
	//  history.push(`/system`)
    history.goBack()
  }
   
  const services = React.useMemo(() => {
    const allowedServices = ProvisioningRoutes.reduce((obj, route) => {
      ProvisioningRoutes.forEach(s => (obj[s] = route))
      return obj
    }, {})
    // filter out ones not in our map or missing read perms
    const filtered = ProvisioningRoutes.map(service => {  
        const route = allowedServices[service.hasModuleRead]
        const module = getModule(route)
        return { ...module, ...service, path: service.path }
      })
    // remove dups such as Shared Call Appearance
    return uniqBy(filtered, 'name')
  }, [getModule])

  // The base view when no sub-component picked
  const GroupServiceList = () => (
    <UiCard title="Provisioning">
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
    const route = Object.values(ProvisioningRoutes).find(r => r.path === path)
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

ProvisioningRouteSettings.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
}
