import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '@/components/angular-component'

export const GroupVirtualOnNetEnterpriseExtensions = ({ match }) => {
  const { serviceProviderId, groupId } = match.params
  return (
    <AngularComponent component="groupVirtualOnNetEnterpriseExtensions" module = 'Virtual On-Net Enterprise Extensions'  serviceProviderId={serviceProviderId} groupId = {groupId}/>
  )
}

GroupVirtualOnNetEnterpriseExtensions.propTypes = {
  match: PropTypes.object.isRequired
}
