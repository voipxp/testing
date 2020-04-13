import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '@/components/angular-component'

export const GroupPagingGroups = ({ match }) => {
  const { serviceProviderId, groupId } = match.params
  return (
    <AngularComponent component="groupPagingGroups" module = {true} serviceProviderId={serviceProviderId} groupId = {groupId}/>
  )
}

GroupPagingGroups.propTypes = {
  match: PropTypes.object.isRequired
}
