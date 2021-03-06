import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import uniqBy from 'lodash/uniqBy'
import { UiClose, UiCard, UiDataTable } from '@/components/ui'
import { useModulePermissions } from '@/utils'
import { AngularComponent } from '@/components/angular-component'
import { GroupCommunication } from './group-communication-routes'
import {
  GroupCallingPlansRoutes
} from '@/components/groups/group-calling-plans-routes'

/* eslint-disable react/display-name */
const columns = [
  {
    key: 'name',
    label: 'Name'
  }
]

export const GroupCommunicationSettings = ({ history, match }) => {
  const { getModule } = useModulePermissions()
  const { serviceProviderId,groupId } = match.params
  const showService = service => {
    history.push(`${match.url}/${service.path}`)
  }

  const hideService = () => {
	history.push(`/groups/${serviceProviderId}/${groupId}/comm-barring`)
   // history.goBack()
  }

  const services = React.useMemo(() => {
    // filter out ones not in our map or missing read perms
    const filtered = GroupCommunication.map(service => {
        const module = getModule(service.hasModuleRead)
        return { ...module, ...service, path: service.path }
      })
    // remove dups such as Shared Call Appearance
    return uniqBy(filtered, 'name')
  }, [getModule])

  // The base view when no sub-component picked
  const GroupServiceList = () => (
    <UiCard title="Comm Barring">
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
    const route = Object.values(GroupCommunication).find(r => r.path === path)
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

  const renderChild = routeProps => {
    return (
      <GroupCallingPlansRoutes {...routeProps}/>
    )
  }

  return (
    <Switch>
      <Route path={`${match.path}/:path`} exact render={renderRoute} />
      <Route path={`${match.path}/:path/:path`} exact render={renderChild} />
      <Route render={GroupServiceList} />
    </Switch>
  )
}

GroupCommunicationSettings.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
}
