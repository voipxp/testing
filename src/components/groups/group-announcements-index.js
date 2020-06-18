import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { AngularComponent } from '@/components/angular-component'
import { UiCard } from '@/components/ui'

export const GroupAnnouncementsIndex = ({ match }) => {
  const rendergroupAnnouncement = () => {
    return (
		<UiCard title="">
			<AngularComponent component={'groupAnnouncement'} />
		</UiCard>
    )
  }

  return (
    <>
      <Switch>
        <Route
          path={`${match.path}/announcement`}
          exact
          render={rendergroupAnnouncement}
        />
        <Route
          render={() => (
            <AngularComponent component="groupAnnouncements" />
          )}
        />
      </Switch>
    </>
  )
}

GroupAnnouncementsIndex.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}
