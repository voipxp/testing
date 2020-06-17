import React from 'react'
import PropTypes from 'prop-types'
import { AngularComponent } from '@/components/angular-component'
import { Switch, Route } from 'react-router-dom'
import { UiCard } from '@/components/ui'

export const GroupCallPickups = ({ match, ...props }) => {
  const { serviceProviderId, groupId, name } = match.params

  const groupCallPickupRender = () => {
    if(name && name !== '') {
      return (
        <UiCard title="">
          <AngularComponent
            component={'groupCallPickup'}
            hasLevel= 'Group'
            module='Call Pickup'
          />
        </UiCard>
      )
    } else {
      return (
        <AngularComponent
        component="groupCallPickups"
        module = 'Call Pickup'
        serviceProviderId={serviceProviderId}
        groupId = {groupId}
        { ...props }
      />
      )
    }
  }

  return (
    <>
      <Switch>
        <Route
          render={groupCallPickupRender}
        />
      </Switch>
    </>
  )

}

GroupCallPickups.propTypes = {
  match: PropTypes.object.isRequired
}
