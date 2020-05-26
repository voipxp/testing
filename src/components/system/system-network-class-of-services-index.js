import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { AngularComponent } from '@/components/angular-component'

export const SystemNetworkClassOfServicesIndex = ({ match }) => {

  const systemNetworkClassOfServiceRender = () => {
    return  <AngularComponent component={'systemNetworkClassOfService'} />
  }
  return (
    <>
    <Switch>
      <Route path={`${match.path}/:name`} exact render={systemNetworkClassOfServiceRender} />
      <Route render = {() => <AngularComponent component='systemNetworkClassOfServices' /> } />
    </Switch>
  </>
  )
}

SystemNetworkClassOfServicesIndex.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}
