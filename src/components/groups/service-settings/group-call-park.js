import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '@/components/angular-component'

export const GroupCallPark = ({ match }) => {
  const { serviceProviderId, groupId } = match.params
  return (
    <AngularComponent component="groupCallPark" module = 'Call Park' serviceProviderId={serviceProviderId} groupId = {groupId}/>
  )
}

GroupCallPark.propTypes = {
  match: PropTypes.object.isRequired
}
