import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '../angular-component'

export const ResellerDnReport = ({ match }) => {
  return <AngularComponent component="systemDn" />
}

ResellerDnReport.propTypes = {
  match: PropTypes.object.isRequired
}
