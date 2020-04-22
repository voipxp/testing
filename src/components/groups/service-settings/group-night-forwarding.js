import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '@/components/angular-component'

export const GroupNightForwarding = ({ match }) => {
  const { serviceProviderId, groupId } = match.params
  return (
    <AngularComponent component="groupNightForwarding" module = 'Group Night Forwarding' serviceProviderId={serviceProviderId} groupId = {groupId}/>
  )
}

GroupNightForwarding.propTypes = {
  match: PropTypes.object.isRequired
}
