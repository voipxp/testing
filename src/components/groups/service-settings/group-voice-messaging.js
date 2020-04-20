import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '@/components/angular-component'

export const GroupVoiceMessaging = ({ match }) => {
  const { serviceProviderId, groupId } = match.params
  return (
    <AngularComponent component="groupVoiceMessaging" serviceProviderId={serviceProviderId} groupId = {groupId}/>
  )
}

GroupVoiceMessaging.propTypes = {
  match: PropTypes.object.isRequired
}
