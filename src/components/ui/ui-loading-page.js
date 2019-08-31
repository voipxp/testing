import React from 'react'
import { Hero } from 'rbx'
import { UiLoading } from './ui-loading'

/**
 * UiLoadingPage shows a full-screen page with a loading indicator. There are no props to control visibility, it is expected to replace the rendering of the page based on criteria.
 *
 * eg:
 * ```
 * const App = () => (isLoading ? <UiLoadingPage /> : <RealComponent />)
 * ```
 */
export const UiLoadingPage = () => (
  <Hero color="link" size="fullheight">
    <Hero.Body>
      <UiLoading />
    </Hero.Body>
  </Hero>
)
