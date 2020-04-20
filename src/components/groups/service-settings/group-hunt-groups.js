import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '@/components/angular-component'

export const GroupHuntGroups = ({ match }) => {
  const { serviceProviderId, groupId } = match.params
  return (
    <AngularComponent component="groupHuntGroups" serviceProviderId={serviceProviderId} groupId = {groupId}/>
  )
}

GroupHuntGroups.propTypes = {
  match: PropTypes.object.isRequired
}
