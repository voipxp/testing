import React from 'react'
import { UiClose, UiCard } from '.'
import { Box } from 'rbx'

export default {
  title: 'Components|UiClose',
  component: UiClose
}

export const example = () => (
  <>
    <UiClose onClick={() => console.log('closed card')} />
    <UiCard title="Example Card">
      <p>Hello There!</p>
    </UiCard>
    <hr />
    <UiClose onClick={() => console.log('closed box')} />
    <Box>
      <p>Example</p>
    </Box>
  </>
)
