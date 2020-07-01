import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '@/components/angular-component'
import { UiCard } from '@/components/ui'

export const GroupMusicOnHold = ({ match, ...props }) => {
  const { serviceProviderId, groupId, name } = match.params

  if(name && name !== '') {
    return (
      <UiCard title="">
        <AngularComponent
          component={'groupMusicOnHold'}
          hasLevel= 'Group Department'
          module='Music On Hold'
        />
      </UiCard>
    )
  } else {
    return (
      <AngularComponent
        component="groupMusicOnHoldIndex"
        module = 'Music On Hold'
        serviceProviderId={serviceProviderId}
        groupId = {groupId}
        { ...props }
    />
    )
  }
  // return (
  //   <AngularComponent component="groupMusicOnHoldIndex" module = 'Music On Hold' serviceProviderId={serviceProviderId} groupId = {groupId}/>
  // )
}

GroupMusicOnHold.propTypes = {
  match: PropTypes.object.isRequired
}
