import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { AngularComponent } from '@/components/angular-component'
import { UiCard } from '@/components/ui'

export const SystemNetworkClassOfServicesIndex = ({ match }) => {
  const systemNetworkClassOfServiceRender = () => {
    return (
      <UiCard title="">
        <AngularComponent component={'systemNetworkClassOfService'} />
      </UiCard>
    )
  }

  return (
    <>
      <Switch>
        <Route
          path={`${match.path}/:name`}
          exact
          render={systemNetworkClassOfServiceRender}
        />
        <Route
          render={() => (
            <AngularComponent component="systemNetworkClassOfServices" />
          )}
        />
      </Switch>
    </>
  )
}

SystemNetworkClassOfServicesIndex.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}
