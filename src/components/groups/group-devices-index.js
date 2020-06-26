import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { AngularComponent } from '@/components/angular-component'
import { UiCard } from '@/components/ui'
import { GroupDevices } from '@/components/groups/group-devices'

export const GroupDevicesIndex = ({ match, history, ...props }) => {
  const renderGroupDevices = () => {
    return (
		<UiCard title="">
			<AngularComponent component={'groupDevice'} {...props} />
		</UiCard>
    )
  }

  return (
    <>
      <Switch>
        <Route
          path={`${match.path}/:deviceName`}
          exact
          render={renderGroupDevices}
        />
        <Route
          render={() => (
            <GroupDevices
            match={match}
            history={history}
            {...props}
            />
          )}
        />
      </Switch>
    </>
  )
}

GroupDevicesIndex.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}
