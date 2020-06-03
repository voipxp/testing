import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { AngularComponent } from '@/components/angular-component'
import { UiCard } from '@/components/ui'

export const BulkTasksIndex = ({ match }) => {
  const renderRecentTask = () => {
    return (
      <UiCard title="">
        <AngularComponent component={'bulkTask'} />
      </UiCard>
    )
  }

  return (
    <>
      <Switch>
        <Route
          path={`${match.path}/:id`}
          exact
          render={renderRecentTask}
        />
        <Route
          render={() => (
            <AngularComponent component="bulkTasksIndex" />
          )}
        />
      </Switch>
    </>
  )
}

BulkTasksIndex.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}
