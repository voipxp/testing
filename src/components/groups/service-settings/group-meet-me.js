import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '@/components/angular-component'

export const GroupMeetMe = ({ match }) => {
  const { serviceProviderId, groupId } = match.params
  return (
    <AngularComponent component="groupMeetMe" module = {true} serviceProviderId={serviceProviderId} groupId = {groupId}/>
  )
}

GroupMeetMe.propTypes = {
  match: PropTypes.object.isRequired
}
