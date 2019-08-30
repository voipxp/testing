import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import '@/index.scss'

const CenterDecorator = storyFn => (
  <div style={{ margin: '2rem 4rem' }}>{storyFn()}</div>
)
addDecorator(CenterDecorator)

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.(js|mdx)$/), module)
