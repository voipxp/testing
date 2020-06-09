import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '@/components/angular-component'
import { UiCard } from '@/components/ui'

export const GroupCollaborate = ({ match, ...props }) => {
  const { serviceProviderId, groupId, name } = match.params

  if(name && name !== '') {
    return (
      <UiCard title="">
        <AngularComponent
          component={'groupCollaborateBridge'}
          hasLevel= 'Group'
          module='Collaborate'
        />
      </UiCard>
    )
  } else {
    return (
      <AngularComponent
        component="groupCollaborate"
        module = 'Collaborate'
        serviceProviderId={serviceProviderId}
        groupId = {groupId}
        { ...props }
    />
    )
  }
  // return (
  //   <AngularComponent component="groupCollaborate" module = 'Collaborate' serviceProviderId={serviceProviderId} groupId = {groupId}/>
  // )
}

GroupCollaborate.propTypes = {
  match: PropTypes.object.isRequired
}
