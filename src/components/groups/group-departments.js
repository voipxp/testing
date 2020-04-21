import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '@/components/angular-component'

export const GroupDepartments = ({ match }) => {
  const { serviceProviderId, groupId } = match.params
  return (
    <AngularComponent component="groupDepartments" policy= 'departmentRead' serviceProviderId={serviceProviderId} groupId = {groupId}/>
  )
}

GroupDepartments.propTypes = {
  match: PropTypes.object.isRequired
}
