import React from 'react'
import ReactGA from 'react-ga'
import PropTypes from 'prop-types'
import { useUiTemplate } from '@/store/ui-template'

export const AppAnalytics = ({ location }) => {
  const { template } = useUiTemplate()
  const { pageGoogleUA } = template

  React.useEffect(() => {
    if (pageGoogleUA) ReactGA.initialize(pageGoogleUA)
  }, [pageGoogleUA])

  React.useEffect(() => {
    if (pageGoogleUA) ReactGA.pageview(location.pathname + location.search)
  }, [pageGoogleUA, location.pathname, location.search])

  return null
}

AppAnalytics.propTypes = {
  location: PropTypes.object
}
