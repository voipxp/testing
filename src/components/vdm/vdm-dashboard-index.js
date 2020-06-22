import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { AngularComponent } from '@/components/angular-component'

export const VdmDashboardIndex = ({ match }) => {

  const vdm = () => {
    return  <AngularComponent component={'vdmTemplate'} />
  }
  return (
    <>
    <Switch>
      <Route path={`${match.path}/templates/:id`} exact render={vdm} />
      <Route render = {() => <AngularComponent component='vdmDashboard' /> } />
    </Switch>
  </>
  )
}

VdmDashboardIndex.propTypes = {
  match: PropTypes.object
}
