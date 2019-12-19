import React from 'react'
import PropTypes from 'prop-types'
import { Import } from '../imports/import'

export const ResellerImport = ({ match, history }) => {
  return <Import history={history} match={match} isBreadcrumb={false}></Import>
}

ResellerImport.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object.isRequired
}
