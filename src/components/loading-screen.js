import React from 'react'
import { Hero } from 'rbx'
import Spinner from './spinner'

function LoadingScreen() {
  return (
    <Hero color="link" size="fullheight">
      <Hero.Body>
        <Spinner />
      </Hero.Body>
    </Hero>
  )
}

export default LoadingScreen
