import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { AngularComponent } from '@/components/angular-component'
import { UiCard } from '@/components/ui'

export const GroupDevicesIndex = ({ match, ...props }) => {
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
            <AngularComponent component="groupDevices" {...props} />
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
