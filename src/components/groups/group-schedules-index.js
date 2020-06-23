import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { AngularComponent } from '@/components/angular-component'

export const GroupSchedulesIndex = ({ match }) => {
  const renderGroupSchedule = () => {
    return (
        <AngularComponent component={'groupSchedule'} />
    )
  }

  return (
    <>
      <Switch>
        <Route
          path={`${match.path}/schedule`}
          exact
          render={renderGroupSchedule}
        />
        <Route
          render={() => (
            <AngularComponent component="groupSchedules" />
          )}
        />
      </Switch>
    </>
  )
}

GroupSchedulesIndex.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}
