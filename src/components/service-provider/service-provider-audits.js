import React from 'react'
import PropTypes from 'prop-types'
import { Audits } from '../audits/audits'

export const ServiceProviderAudits = ({ match, history }) => {
  // const open = ({ id }) => history.push(`/audits/${id}`)
  return <Audits history={history} match={match} isBreadcrumb={false}></Audits>
}

ServiceProviderAudits.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object.isRequired
}
