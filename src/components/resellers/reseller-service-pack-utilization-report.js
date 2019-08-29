import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '../angular-component'

export const ResellerServicePackUtilizationReport = ({ match }) => {
  return <AngularComponent component="systemServicePackUtilizationReport" />
}

ResellerServicePackUtilizationReport.propTypes = {
  match: PropTypes.object.isRequired
}
