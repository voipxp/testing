import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { AngularComponent } from '@/components/angular-component'
import { UiCard } from '@/components/ui'

export const GroupDeviceTypesIndex = ({ match, ...props }) => {

  const renderGroupDeviceType = () => {
    return (
      <UiCard title="">
        <AngularComponent component='groupDeviceType' {...props} />
      </UiCard>
    )
  }

  return (
    <>
      <Switch>
        <Route
          path={`${match.path}/deviceType`}
          exact
          render={renderGroupDeviceType}
        />
        <Route
          render={() => <AngularComponent component="groupDeviceTypes" {...props} />}
        />
      </Switch>
    </>
  )
}

GroupDeviceTypesIndex.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}
