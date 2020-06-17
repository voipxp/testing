import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { AngularComponent } from '@/components/angular-component'
import { UiCard } from '@/components/ui'

export const EnterpriseEnterpriseTrunksIndex = ({ match, ...props }) => {
  const enterpriseEnterpriseTrunkRender = () => {
    return (
      <UiCard title="">
        <AngularComponent
          component={'enterpriseEnterpriseTrunk'}
          // hasLevel= 'Service Provider'
          // hasModuleRead= 'Trunk Group'
          { ...props }
  // {...match}
        />
      </UiCard>
    )
  }

  return (
    <>
      <Switch>
        <Route
          path={`${match.path}/:trunkName`}
          exact
          render={enterpriseEnterpriseTrunkRender}
        />
        <Route
          render={() => (
            <AngularComponent
            component="enterpriseEnterpriseTrunks"
            { ...props }
		    />
          )}
        />
      </Switch>
    </>
  )
}

EnterpriseEnterpriseTrunksIndex.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}
