import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '../angular-component'

export const ResellerServiceUtilizationReport = ( {match} ) => {
	return <AngularComponent component="systemServiceUtilizationReport" />
}

ResellerServiceUtilizationReport.propTypes = {
	match: PropTypes.object.isRequired
}