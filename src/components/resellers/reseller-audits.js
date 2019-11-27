import React from 'react'
import PropTypes from 'prop-types'
import Audits from '../audits/audits'

export const ResellerAudits = ({ match }) => {
  return <Audits isBreadcrumb={false}></Audits>
}

ResellerAudits.propTypes = {
  match: PropTypes.object.isRequired
}