import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '@/components/angular-component'

export const GroupAutoAttendants = ({ match }) => {
  const { serviceProviderId, groupId } = match.params
  return (
    <AngularComponent component="autoAttendants" serviceProviderId={serviceProviderId} groupId = {groupId}/>
  )
}

GroupAutoAttendants.propTypes = {
  match: PropTypes.object.isRequired
}
