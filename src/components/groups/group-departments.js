import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '@/components/angular-component'
import { Switch, Route } from 'react-router-dom'
import { UiCard } from '@/components/ui'
export const GroupDepartments = ({ match, ...props }) => {
  const { serviceProviderId, groupId } = match.params

  const departmentsRender = () => {
    return (
      <AngularComponent
        component="groupDepartments"
        policy="departmentRead"
        serviceProviderId={serviceProviderId}
        groupId={groupId}
        {...props}
      />
    )
  }

  const departmentRender = () => {
    return (
      <UiCard title="Department">
        <AngularComponent
          component="groupDepartment"
          policy="departmentRead"
          serviceProviderId={serviceProviderId}
          groupId={groupId}
          {...props}
        />
      </UiCard>
    )
  }

  return (
    <Switch>
      <Route
        path={`${match.path}/:department`}
        exact
        render={() => departmentRender()}
      />
      <Route render={() => departmentsRender()} />
    </Switch>
  )
}

GroupDepartments.propTypes = {
  match: PropTypes.object.isRequired
}
