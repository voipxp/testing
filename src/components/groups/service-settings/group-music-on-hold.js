import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '@/components/angular-component'

export const GroupMusicOnHold = ({ match }) => {
  const { serviceProviderId, groupId } = match.params
  return (
    <AngularComponent component="groupMusicOnHoldIndex" module = {true} serviceProviderId={serviceProviderId} groupId = {groupId}/>
  )
}

GroupMusicOnHold.propTypes = {
  match: PropTypes.object.isRequired
}
