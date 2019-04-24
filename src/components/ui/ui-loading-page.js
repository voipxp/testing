import React from 'react'
import { Hero } from 'rbx'
import { UiSpinner } from './ui-spinner'

export const UiLoadingPage = () => (
  <Hero color="link" size="fullheight">
    <Hero.Body>
      <UiSpinner />
    </Hero.Body>
  </Hero>
)

export default UiLoadingPage
