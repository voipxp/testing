import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '../angular-component'

export const ResellerServiceProviders = ({ match }) => {
  const { resellerId } = match.params
  return <AngularComponent component="serviceProviders" resellerId={resellerId} />
}

ResellerServiceProviders.propTypes = {
  match: PropTypes.object.isRequired
}
