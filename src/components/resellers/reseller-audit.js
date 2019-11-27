import React from 'react'
import PropTypes from 'prop-types'
import { Audit } from '../audits/audit'

export const ResellerAudit = ({ match, history }) => {
  return <Audit history={history} match={match} isBreadcrumb={false}></Audit>
}

ResellerAudit.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object.isRequired
}
