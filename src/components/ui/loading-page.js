import React from 'react'
import { Hero } from 'rbx'
import Spinner from './spinner'

const LoadingPage = () => (
  <Hero color="link" size="fullheight">
    <Hero.Body>
      <Spinner />
    </Hero.Body>
  </Hero>
)

export default LoadingPage
