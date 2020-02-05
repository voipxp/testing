import React from 'react'
import PropTypes from 'prop-types'
import { Export } from '../exports/export'

export const ResellerExport = ({ match, history }) => {
  return <Export history={history} match={match} isBreadcrumb={false}></Export>
}

ResellerExport.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object.isRequired
}
