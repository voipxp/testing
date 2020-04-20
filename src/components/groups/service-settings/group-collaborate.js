import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '@/components/angular-component'

export const GroupCollaborate = ({ match }) => {
  const { serviceProviderId, groupId } = match.params
  return (
    <AngularComponent component="groupCollaborate" serviceProviderId={serviceProviderId} groupId = {groupId}/>
  )
}

GroupCollaborate.propTypes = {
  match: PropTypes.object.isRequired
}
