import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '@/components/angular-component'

export const GroupTrunkGroups = ({ match }) => {
  const { serviceProviderId, groupId } = match.params
  return (
    <AngularComponent component="groupTrunkGroups" serviceProviderId={serviceProviderId} groupId = {groupId}/>
  )
}

GroupTrunkGroups.propTypes = {
  match: PropTypes.object.isRequired
}
