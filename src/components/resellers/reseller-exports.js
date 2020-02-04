import React from 'react'
import PropTypes from 'prop-types'
import { Exports } from '../exports/exports'

export const ResellerExports = ({ match, history }) => {
  // const open = ({ id }) => history.push(`/audits/${id}`)
  return (
    <Exports history={history} match={match} isBreadcrumb={false}></Exports>
  )
}

ResellerExports.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object.isRequired
}
