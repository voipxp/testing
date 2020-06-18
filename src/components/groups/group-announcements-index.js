import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { AngularComponent } from '@/components/angular-component'
import { UiCard } from '@/components/ui'

export const GroupAnnouncementsIndex = ({ match, ...props }) => {
  const rendergroupAnnouncement = () => {
    return (
		<UiCard title="">
			<AngularComponent component={'groupAnnouncement'} {...props} />
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
            <AngularComponent component="groupAnnouncements" {...props} />
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
