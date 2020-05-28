import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { AngularComponent } from '@/components/angular-component'
import { UiCard } from '@/components/ui'

export const ServiceProviderServicePacksIndex = ({ match, ...props }) => {
  const serviceProviderServicePackRender = () => {
    return (
      <UiCard title="">
        <AngularComponent component={'serviceProviderServicePack'} />
      </UiCard>
    )
  }

  return (
    <>
      <Switch>
        <Route
          path={`${match.path}/:servicePackName`}
          exact
          render={serviceProviderServicePackRender}
        />
        <Route
          render={() => (
            <AngularComponent
              component="serviceProviderServicePacks"
              { ...props }
              />
          )}
        />
      </Switch>
    </>
  )
}

ServiceProviderServicePacksIndex.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}
