import React from 'react'
import ReactGA from 'react-ga'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import get from 'lodash/get'
import { useQuery } from '@apollo/react-hooks'

const UI_QUERY = gql`
  query appAnalyticsUi {
    uiTemplate {
      _id
      pageGoogleUA
    }
  }
`

export const AppAnalytics = ({ location }) => {
  const { data } = useQuery(UI_QUERY)
  const pageGoogleUA = get(data, 'uiTemplate.pageGoogleUA')

  React.useEffect(() => {
    if (pageGoogleUA) ReactGA.initialize(pageGoogleUA)
  }, [pageGoogleUA])

  React.useEffect(() => {
    if (pageGoogleUA) ReactGA.pageview(location.pathname + location.search)
  }, [location.pathname, location.search, pageGoogleUA])

  return null
}

AppAnalytics.propTypes = {
  location: PropTypes.object
}
