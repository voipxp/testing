import React from 'react'
import PropTypes from 'prop-types'
import { Audit } from '../audits/audit'

export const ServiceProviderAudit = ({ match, history }) => {
  return <Audit history={history} match={match} isBreadcrumb={false}></Audit>
}

ServiceProviderAudit.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object.isRequired
}
