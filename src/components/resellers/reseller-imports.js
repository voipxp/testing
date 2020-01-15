import React from 'react'
import PropTypes from 'prop-types'
import { Imports } from '../imports/imports'

export const ResellerImports = ({ match, history }) => {
  // const open = ({ id }) => history.push(`/audits/${id}`)
  return (
    <Imports history={history} match={match} isBreadcrumb={false}></Imports>
  )
}

ResellerImports.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object.isRequired
}
