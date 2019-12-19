import React from 'react'
import PropTypes from 'prop-types'
import { Imports } from '../imports/imports'

export const ResellerAudits = ({ match, history }) => {
  // const open = ({ id }) => history.push(`/audits/${id}`)
  return (
    <Imports history={history} match={match} isBreadcrumb={false}></Imports>
  )
}

ResellerAudits.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object.isRequired
}
