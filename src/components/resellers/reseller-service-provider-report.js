import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '../angular-component'

export const ResellerServiceProviderReport = ({ match }) => {
  return <AngularComponent component="serviceProviderReport" />
}

ResellerServiceProviderReport.propTypes = {
  match: PropTypes.object.isRequired
}
