import React from 'react'
import { HashRouter } from 'react-router-dom'
import { UiMenu, UiMenuBase } from './ui-menu'
import { Box } from 'rbx'
import PropTypes from 'prop-types'

export default {
  title: 'Components|UiMenu',
  component: UiMenuBase
}

const ExampleBox = ({ text }) => (
  <Box>
    <p>{text}</p>
  </Box>
)
ExampleBox.propTypes = {
  text: PropTypes.string
}

export const Example = () => (
  <HashRouter hashType="hashbang" style={{ width: '1000px' }}>
    <UiMenu
      menu={[
        {
          label: 'First',
          items: [
            {
              name: 'Link 1',
              path: 'link-1',
              component: ExampleBox,
              text: 'Example 1'
            },
            {
              name: 'Link 2',
              path: 'link-2',
              component: ExampleBox,
              text: 'Example 2'
            }
          ]
        },
        {
          label: 'Second',
          items: [
            {
              name: 'Link 3',
              path: 'link-3',
              component: ExampleBox,
              text: 'Example 3'
            }
          ]
        }
      ]}
    />
  </HashRouter>
)
