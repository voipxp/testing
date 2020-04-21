import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '@/components/angular-component'

export const GroupCallCenters = ({ match }) => {
  const { serviceProviderId, groupId } = match.params
  return (
    <AngularComponent component="groupCallCenters" module = 'Group Call Center' serviceProviderId={serviceProviderId} groupId = {groupId}/>
  )
}

GroupCallCenters.propTypes = {
  match: PropTypes.object.isRequired
}
