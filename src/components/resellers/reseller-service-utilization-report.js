import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '../angular-component'

export const ResellerServiceUtilizationReport = ({ match }) => {
  const { resellerId } = match.params
  return (
    <AngularComponent
      component="systemServiceUtilizationReport"
      resellerId={resellerId}
    />
  )
}

ResellerServiceUtilizationReport.propTypes = {
  match: PropTypes.object.isRequired
}
