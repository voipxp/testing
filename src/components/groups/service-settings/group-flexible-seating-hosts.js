import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '@/components/angular-component'

export const GroupFlexibleSeatingHosts = ({ match }) => {
  const { serviceProviderId, groupId } = match.params
  return (
    <AngularComponent component="groupFlexibleSeatingHosts" serviceProviderId={serviceProviderId} groupId = {groupId}/>
  )
}

GroupFlexibleSeatingHosts.propTypes = {
  match: PropTypes.object.isRequired
}
