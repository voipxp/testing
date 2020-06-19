import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { AngularComponent } from '@/components/angular-component'

export const GroupCallingPlansIndex = ({ match }) => {
  const path = match.params.path

  const getComponent = (path) => {
    // eslint-disable-next-line default-case
    switch (path) {
      case 'codes':
        return 'groupOutgoingCallingPlanAuthorizationCodes'
      case 'digitPatterns':
        return 'groupCallingPlanDigitPatterns'
      case 'pinholeDigitPatterns':
        return 'groupOutgoingCallingPlanPinholeDigitPatterns'
      case 'transfer':
        return 'groupOutgoingCallingPlanTransferNumbers'

      case 'incoming':
        return 'groupIncomingCallingPlan'
      case 'outgoing':
        return 'groupOutgoingCallingPlan'
      case 'digitPlan':
        return 'groupOutgoingCallingPlanDigitPlan'
      case 'pinholeDigitPlan':
        return 'groupOutgoingCallingPlanPinholeDigitPlan'
    }
  }

  return (
    <>
      <Switch>
        <Route render = { () => <AngularComponent component={getComponent(path)} /> } />
      </Switch>
    </>
  )
}

GroupCallingPlansIndex.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}
