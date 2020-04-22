import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '@/components/angular-component'

export const GroupCallPickups = ({ match }) => {
  const { serviceProviderId, groupId } = match.params
  return (
    <AngularComponent component="groupCallPickups" module = 'Call Pickup' serviceProviderId={serviceProviderId} groupId = {groupId}/>
  )
}

GroupCallPickups.propTypes = {
  match: PropTypes.object.isRequired
}
